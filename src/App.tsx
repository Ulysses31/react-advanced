import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./template/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    // <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <NavBar />
          <hr />
          <Outlet />
        </main>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    // </Provider>
  );
}

export default App;
