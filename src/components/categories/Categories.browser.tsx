// import {Styles} from './Categories.module.css'

import { useQuery } from "@tanstack/react-query";
import CategoriesService from "../../services/categories.service";
import BaseBrowser from "../base/Base.browser";

function CategoriesBrowser() {
  const title = "Categories";

  const getCategories = () => {
    return useQuery({
      retry: 0,
      queryKey: [title, 'all'],
      queryFn: async () => {
        const data = await new CategoriesService().findAll();
        return data;
      },
    });
  };

  const deleteDto = async (id: number) => {
    return await new CategoriesService().delete(id);
  };

  return (
    <BaseBrowser title={title} queryFn={getCategories} mutationFn={deleteDto} />
  );
}

export default CategoriesBrowser;
