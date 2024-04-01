// import Styles from './ErrorMessage.module.css'

import { AxiosError } from "axios";

interface ErrorMessageProps {
  error: Error;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    error && (
      <div className="flex-col p-10 place-content-center text-center bg-white dark:bg-gray-800 shadow-md space-y-2 mb-6">
        <h2 className="font-bold text-4xl text-red-500 dark:text-red-400">
          Error
        </h2>
        <p className="font-normal text-lg text-gray-500 dark:text-cyan-500">
          An error occurred {(error as AxiosError).response?.statusText}
        </p>
      </div>
    )
  );
}

export default ErrorMessage;
