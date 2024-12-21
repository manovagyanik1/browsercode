import { WebContainer } from '@webcontainer/api';

let webcontainerInstance: WebContainer;

export async function getWebContainerInstance() {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  return webcontainerInstance;
}

export async function mountFiles(files: Record<string, any>) {
  const instance = await getWebContainerInstance();
  await instance.mount(files);
}

export async function startShell() {
  const instance = await getWebContainerInstance();
  return instance.spawn('jsh', {
    terminal: {
      cols: 80,
      rows: 24,
    },
  });
}