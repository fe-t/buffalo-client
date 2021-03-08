export interface PropItem {
  name: string;
  zhName: string;
  type: string;
  value?: any;
}

export interface Material {
  id: string;
  name: string;
  zhName: string;
  props?: PropItem[];
}

export interface CanvasComponent {
  id: string;
  name: string;
  zhName: string;
  materialId: string;
  props?: PropItem[];
}
