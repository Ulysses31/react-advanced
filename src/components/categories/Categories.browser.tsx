// import {Styles} from './Categories.module.css'

import { useQuery } from "@tanstack/react-query";
import CategoriesService from "../../services/categories.service";
import BaseBrowser from "../base/Base.browser";

function CategoriesBrowser() {
  const title = 'Categories';

  const getCategories = () => {
    return useQuery({
      retry: 0,
      queryKey: ["categories"],
      queryFn: async () => {
        try {
          const data = await new CategoriesService().findAll();
          return data;
        } catch (error: any) {
          throw error;
        }
      },
    });
  };

  return (
    <BaseBrowser
      title={title}
      queryFn={getCategories}
    />
  );
}

export default CategoriesBrowser;
