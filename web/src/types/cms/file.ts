/**
 * Model definition for file
 */
export interface IFile {
  id: string;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: { [key: string]: any };
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: { [key: string]: any };
  related?: any[];
}
