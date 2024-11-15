import { GraphQLErrors } from "@apollo/client/errors";

export interface IHandleGraphqlErrorProps {
  graphQLErrors?: GraphQLErrors;
}

const handleGraphqlError = (errors: IHandleGraphqlErrorProps) => {
  const errorMessage = errors?.graphQLErrors?.map(
    ({ message }: { message: string }) => message,
  );
  return errorMessage?.at(0);
};
export default handleGraphqlError;
