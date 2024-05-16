class ApiError{
  constructor(statusCode,message,stack="",error=[]){
      // super(message);
      this.statusCode=statusCode,
      this.message=message,
      this.stack=stack,
      this.success=false
      this.error=error
      if(stack){
          this.stack=stack
      }else{
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

export {ApiError};