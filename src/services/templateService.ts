import { WebContainer } from '@webcontainer/api';

export async function initializeTemplate(webcontainer: WebContainer) {
  await webcontainer.mount({
    'typescript-template': {
      directory: {}
    }
  });
} 