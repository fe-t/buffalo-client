import { ElementType } from "react";

export interface Material {
  id: string;
  name: string;
  zhName: string;
  component: ElementType;
  props?: object;
}
