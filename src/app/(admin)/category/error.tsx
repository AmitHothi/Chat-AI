"use client";

import { Button } from "@/components/ui/button";

interface IErrorBoundary {
  error: Error;
  reset: () => void;
}
const ErrorBoundary = ({ error, reset }: IErrorBoundary) => (
  <div className="flex flex-1 items-center justify-center">
    {error.message}
    <Button onClick={() => reset()}>Try again</Button>
  </div>
);

export default ErrorBoundary;
