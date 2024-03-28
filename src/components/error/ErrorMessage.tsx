import { FieldError } from "react-hook-form";

const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return null;

  return <h2 style={{'color': 'red'}}>{error.message}</h2>;
};

export default ErrorMessage;
