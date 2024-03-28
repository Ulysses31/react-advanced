// import styles from './Base.browser.module.css'

import { UseQueryResult } from "@tanstack/react-query";


interface BaseBrowserProps {
  title: string;
  queryFn: () => UseQueryResult<any, Error>;
}

function BaseBrowser({ title, queryFn }: BaseBrowserProps) {
  const { data, error, isPending } = queryFn();

  return (
    <>
      <h1>{title}</h1>

      {isPending && <p>Loading...</p>}

      {error && <p>An error occurred {error.message}</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default BaseBrowser;
