interface CustomError extends Error {
  code: number;
}

class CustomError extends Error implements CustomError {
  constructor(message: string, code: number) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

export const isCustomError = (err: Error): err is CustomError => {
  return 'code' in err;
};

export { CustomError };
