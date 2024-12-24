declare module "*.svg" {
    const content: string;
    export default content;
  }
  
  declare module "*.png" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpeg" {
    const content: string;
    export default content;
  }
  
  declare module "*.gif" {
    const content: string;
    export default content;
  }
  
  // custom.d.ts

declare module '*.tsx' {
    const component: React.FC<any>;
    export default component;
  }
  
  declare module '*.ts' {
    const content: any;
    export default content;
  }
  