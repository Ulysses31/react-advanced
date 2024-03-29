import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Footer from "./template/Footer";
import NavBar from "./template/NavBar";

const queryClient = new QueryClient();

function App() {
  return (
    // <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <Outlet />
        </div>
      </main>
      <Footer />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
    // </Provider>
  );
}

export default App;
