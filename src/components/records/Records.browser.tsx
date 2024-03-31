// import {Styles} from './Records.module.css'

import { useQuery } from "@tanstack/react-query";
import RecordsService from "../../services/records.service";
import BaseBrowser from "../base/Base.browser";

function RecordsBrowser() {
  const title = "Records";

  const getRecords = () => {
    return useQuery({
      retry: 0,
      queryKey: [title, 'all'],
      queryFn: async () => {
        const data = await new RecordsService().findAll();
        return data;
      },
    });
  };

  const deleteDto = async (id: number) => {
    return await new RecordsService().delete(id);
  };

  return (
    <BaseBrowser title={title} queryFn={getRecords} mutationFn={deleteDto} />
  );
}

export default RecordsBrowser;
