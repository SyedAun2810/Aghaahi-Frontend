declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;
  export default ReactComponent;
}

declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.webp" {
  const value: string;
  export default value;
}

/// <reference types="vite/client" />
