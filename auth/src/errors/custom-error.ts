// We create an abstract class that extends the built-in Error class
// "abstract" means:
// - Cannot be instantiated -> new CustomError()
// - Used to set up requirements for subclasses
export abstract class CustomError extends Error {
  // Every child class MUST define a statusCode (e.g. 400, 401, 404...)
  // "abstract" forces subclasses to implement it
  abstract statusCode: number;

  constructor(message: string) {
    // Call the parent Error constructor
    // This sets the error message (err.message)
    super(message);

    // Fixes an issue with extending built-in classes in TypeScript
    // Without this, instanceof checks might FAIL ❗
    // (very important for: err instanceof CustomError)
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Every child class MUST implement this method
  // This method defines how the error is formatted when sent to the client
  abstract serializeErrors(): {
    message: string;
    field?: string; // optional (used for validation errors)
  }[];
}
