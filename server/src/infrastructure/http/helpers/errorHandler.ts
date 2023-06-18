import { HttpException, HttpStatus } from "@nestjs/common";

export function errorHandler(error: any): void {
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.message,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
    {
      cause: error,
    },
  );
}
