import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import CategoriesBrowser from "./components/categories/Categories.browser.tsx";
import CategoriesLoader from "./components/categories/Categories.loader.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import RecordsBrowser from "./components/records/Records.browser.tsx";
import RecordsLoader from "./components/records/Records.loader.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "categories", element: <CategoriesBrowser /> },
      { path: "categories/:id", element: <CategoriesLoader /> },
      { path: "records", element: <RecordsBrowser /> },
      { path: "records/:id", element: <RecordsLoader /> },
    ],
  },
];

export default routes;
