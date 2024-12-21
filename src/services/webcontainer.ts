import { WebContainer } from '@webcontainer/api';

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

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

export async function startShell() {
  const instance = await getWebContainerInstance();
  
  try {
    const process = await instance.spawn('jsh', {
      terminal: {
        cols: 80,
        rows: 24,
      },
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