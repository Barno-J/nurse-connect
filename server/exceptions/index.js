export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
	super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation error") {
	super(message, 400);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized access") {
	super(message, 401);
  }
}

export class ForbiddenException extends AppError {
  constructor(message = "Forbidden access") {
	super(message, 403);
  }
}
export class BadRequestException extends AppError {
  constructor(message = "Bad request") {
	super(message, 400);
  }
}
export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
	super(message, 500);
  }
}
