import { Response } from "express";

export class ApiResponse {
  
  static success<T>(
    res: Response,
    statusCode: number,
    data: T,
    message = "Success",
  ) {

    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });

  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    errors: unknown[] = [],) {

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
    
  }
}
