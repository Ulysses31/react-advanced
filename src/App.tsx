import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "./template/Footer";
import NavBar from "./template/NavBar";

const queryClient = new QueryClient();

function App() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {/* <Provider store={store}> */}
      <CookiesProvider defaultSetOptions={{ path: "/", sameSite: "strict" }}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <main className="dark:bg-gray-900 pb-10">
            <Toaster
              position="top-right"
              gutter={8}
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                // style: {
                //   background: "#363636",
                //   color: "#fff",
                // },
              }}
            />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {/* Your content */}
              <Outlet />
            </div>
          </main>
          <Footer />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </CookiesProvider>
      {/* </Provider> */}
    </Auth0Provider>
  );
}

export default App;
