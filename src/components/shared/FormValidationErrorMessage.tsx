import { FieldError } from "react-hook-form";

const FormValidationErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return null;

  return <h2 className="text-red-600 font-bold m-2">{error.message}</h2>;
};

export default FormValidationErrorMessage;
