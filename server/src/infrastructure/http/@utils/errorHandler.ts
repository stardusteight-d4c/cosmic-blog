import { HttpException, HttpStatus } from "@nestjs/common";

export function errorHandler(error: any) {
  // console.error(error);
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
