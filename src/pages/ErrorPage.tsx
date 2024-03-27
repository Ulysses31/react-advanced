import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  const prod = import.meta.env.PROD;

  return (
    <div>
      {/* <main className="prose p-5"> */}
      <main className={styles.mainError}>
        <h1>Oops...</h1>&nbsp;
        <p>
          {isRouteErrorResponse(error)
            ? "The requested page was not found."
            : prod
            ? "An unexpected error occurred."
            : (error as Error).message}
        </p>
      </main>
    </div>
  );
};

export default ErrorPage;
