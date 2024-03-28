// import {Styles} from './Records.module.css'

import { useQuery } from "@tanstack/react-query";
import RecordsService from "../../services/records.service";
import BaseBrowser from "../base/Base.browser";

function RecordsBrowser() {
  const getRecords = () => {
    return useQuery({
      retry: 0,
      queryKey: ["records"],
      queryFn: async () => {
        try {
          const data = await new RecordsService().findAll();
          return data;
        } catch (error: any) {
          throw error;
        }
      },
    });
  };

  return <BaseBrowser title="Records" queryFn={getRecords} />;
}

export default RecordsBrowser;
