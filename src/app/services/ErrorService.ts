class ErrorService {
    getErrorMessage(error: any): string {
      let message = "An error occured";
  
      if (error instanceof Error) {
        message = error.message;
      }
  
      return message;
    }
  }
  
  export const errorService = new ErrorService();
  