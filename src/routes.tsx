import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import CategoriesBrowser from "./components/categories/Categories.browser.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import RecordsBrowser from "./components/records/Records.browser.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import CategoriesLoader from "./components/categories/Categories.loader.tsx";
import RecordsLoader from "./components/records/Records.loader.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "categories", element: <CategoriesBrowser /> },
      { path: "categories/form/:id", element: <CategoriesLoader /> },
      { path: "records", element: <RecordsBrowser /> },
      { path: "records/form/:id", element: <RecordsLoader /> },
    ],
  },
];

export default routes;
