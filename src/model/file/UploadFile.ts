import { Model } from 'mvc-ts';

export class UploadFile {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: {
    'content-disposition': string;
    'content-type': string;
  };

  cdn: {
    hash: string;
    key: string;
    persistenId: string;
    server_url?: string;
  };

  size: number;
  name: string;
  type: string;

  extension: string;
}