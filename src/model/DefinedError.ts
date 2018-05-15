export class DefinedError extends Error {
  status: number;
  message: string;
  description?: string;

  constructor(status: number, message: string, description?: string | null) {
    super();
    this.status = status;
    this.message = message;
    this.description = description;
  }
}