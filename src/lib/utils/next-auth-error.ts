import { AuthError } from "next-auth";

export const handleNextAuthError = (errors: any) => {
  const errorMessage = errors?.map(
    ({ message }: { message: string }) => message,
  );
  return errorMessage?.at(0);
};

export class CustomNextAuthError extends AuthError {
  code = "custom";
  errorMessage: string;
  data?: any;
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);
    this.errorMessage = message;
    this.data = errorOptions;
  }
}
