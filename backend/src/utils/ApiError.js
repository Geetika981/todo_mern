class ApiError extends Error {
    constructor(statusCode, message, errors = [], stack = "") {
      super(message);
      this.statusCode = statusCode
        this.stack = stack
        this.errors = errors
        this.message = message
      this.success = false;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };
  