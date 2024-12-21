import { WebContainer } from '@webcontainer/api';

export async function initializeTemplate(webcontainer: WebContainer) {
  // Just mount an empty root directory for our project
  await webcontainer.mount({
    'typescript-template': {
      directory: {}
    }
  });
} 