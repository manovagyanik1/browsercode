import { WebContainer } from '@webcontainer/api';
import type { FileNode } from '../types/fileSystem';

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

// Convert our FileNode structure to WebContainer's FileSystemTree
function convertToWebContainerFormat(files: FileNode[]) {
  const result: Record<string, any> = {};

  function processNode(node: FileNode, currentPath: string) {
    if (node.type === 'file') {
      // Handle files
      if (!currentPath) {
        // Root level files
        result[node.name] = {
          file: {
            contents: node.content || '',
          },
        };
      } else {
        // For nested files, we need to ensure the directory structure exists
        let current = result;
        const pathParts = currentPath.split('/');
        
        // Create nested directory structure
        pathParts.forEach(part => {
          if (!current[part]) {
            current[part] = { directory: {} };
          }
          current = current[part].directory;
        });
        
        // Add the file to the deepest directory
        current[node.name] = {
          file: {
            contents: node.content || '',
          },
        };
      }
    } else {
      // Handle directories
      if (!currentPath) {
        // Root level directories
        result[node.name] = {
          directory: {},
        };
      } else {
        // Nested directories
        let current = result;
        const pathParts = currentPath.split('/');
        
        // Create parent directory structure
        pathParts.forEach(part => {
          if (!current[part]) {
            current[part] = { directory: {} };
          }
          current = current[part].directory;
        });
        
        // Add the current directory
        current[node.name] = {
          directory: {},
        };
      }
      
      // Process children
      if (node.children) {
        node.children.forEach(child => 
          processNode(child, currentPath ? `${currentPath}/${node.name}` : node.name)
        );
      }
    }
  }

  files.forEach(node => processNode(node, ''));
  return result;
}

export async function getWebContainerInstance() {
  if (webcontainerInstance) {
    return webcontainerInstance;
  }

  if (!bootPromise) {
    bootPromise = WebContainer.boot()
      .then((instance) => {
        webcontainerInstance = instance;
        return instance;
      })
      .catch((error) => {
        console.error('Failed to boot WebContainer:', error);
        bootPromise = null;
        throw error;
      });
  }

  return bootPromise;
}

export async function mountFiles(files: FileNode[]) {
  const instance = await getWebContainerInstance();
  const webContainerFiles = convertToWebContainerFormat(files);
  
  // Log the structure for debugging
  console.log('Mounting files:', webContainerFiles);
  
  try {
    await instance.mount(webContainerFiles);
  } catch (error) {
    console.error('Error mounting files:', error);
    throw error;
  }
}

export async function startShell() {
  const instance = await getWebContainerInstance();
  
  try {
    const process = await instance.spawn('jsh', {
      terminal: {
        cols: 80,
        rows: 24,
      },
      env: {
        NODE_ENV: 'development',
      }
    });

    if (!process.input || !process.output) {
      throw new Error('Shell process streams are not available');
    }

    return process;
  } catch (error) {
    console.error('Failed to start shell process:', error);
    throw error;
  }
}