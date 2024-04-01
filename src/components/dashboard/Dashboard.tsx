// import {Styles} from './Dashboard.module.css'

import { ArrowPathIcon, ServerIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CategoriesService from "../../services/categories.service";
import RecordsService from "../../services/records.service";
import { navigation } from "../../template/NavBar";
import Loading from "../shared/Loading";
import { getIcon } from "../shared/shared";

function Dashboard() {
  const title = "Dashboard";
  const fRecords: any = [];
  const [filterdRecords, setFilterdRecords] = useState(fRecords);
  const [showModel, setShowModel] = useState(false);

  // Queries
  const useCategoriesQry = () => {
    return useQuery({
      retry: 0,
      queryKey: ["Categories", "all"],
      queryFn: async () => {
        const data = await new CategoriesService().findAll();
        return data;
      },
    });
  };

  const useRecordsQry = () => {
    return useQuery({
      retry: 0,
      queryKey: ["Records", "all"],
      queryFn: async () => {
        const data = await new RecordsService().findAll();
        return data;
      },
    });
  };

  const {
    data: categories,
    error: categoryError,
    isPending: categoryIsPending,
    isFetching: categoryIsFetching,
    refetch: categoryRefetch,
  } = useCategoriesQry();

  const {
    data: records,
    error: recordError,
    isPending: recordIsPending,
    isFetching: recordIsFetching,
    refetch: recordRefetch,
  } = useRecordsQry();

  const handleCategoryChange = (id: number) => {
    setFilterdRecords(
      records &&
        records.filter((record: any) => {
          return record.categoryId === id;
        })
    );
  };

  useEffect(() => {
    setFilterdRecords(
      records &&
        records.filter((record: any) => {
          return (
            categories &&
            categories.length > 0 &&
            record.categoryId === categories[0].id
          );
        })
    );
    return () => {};
  }, [categories, records, categoryIsFetching, recordIsFetching]);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md mb-6">
        <div className="flex place-content-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex text-2xl font-bold tracking-tight text-gray-500 dark:text-cyan-500">
            {getIcon(navigation, title)}
            {title}
          </h1>
          <div className="flex space-x-2">
            <ArrowPathIcon
              className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 cursor-pointer"
              title="Refresh data"
              onClick={() => {
                categoryRefetch();
                recordRefetch();
              }}
            />
            <ServerIcon
              className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 cursor-pointer"
              title="Show data model"
              onClick={() => setShowModel(!showModel)}
            />
          </div>
        </div>
      </header>

      {(categoryIsPending ||
        recordIsPending ||
        categoryIsFetching ||
        recordIsFetching) && <Loading />}

      {(categoryError || recordError) && (
        <div className="flex-col p-10 place-content-center text-center bg-white dark:bg-gray-800 shadow-md space-y-2 mb-6">
          <h2 className="font-bold text-4xl text-red-500 dark:text-red-400">
            Error
          </h2>
          <p className="font-normal text-lg text-gray-500 dark:text-cyan-500">
            An error occurred {categoryError && categoryError.message}
            {recordError && recordError.message}
          </p>
        </div>
      )}

      {showModel && (
        <div>
          {!categoryIsPending && !recordIsPending && (
            <>
              <pre className="bg-white dark:bg-gray-800 dark:text-cyan-500 p-3 h-96 mb-6 overflow-auto shadow-md">
                <code className="text-sm">
                  {categories && JSON.stringify(categories, null, 2)}
                </code>
              </pre>
              <pre className="bg-white dark:bg-gray-800 dark:text-cyan-500 p-3 h-96 mb-6 overflow-auto shadow-md">
                <code className="text-sm">
                  {records && JSON.stringify(records, null, 2)}
                </code>
              </pre>
            </>
          )}
        </div>
      )}

      {categories &&
        categories.length === 0 &&
        !categoryIsPending &&
        !recordIsPending &&
        (!categoryIsFetching || !recordIsFetching) && (
          <div className="shadow-md p-5 bg-white dark:bg-gray-800 mb-6 max-h-screen overflow-y-auto">
            <p className="text-center font-bold text-gray-500 dark:text-cyan-500">
              No categories found
            </p>
          </div>
        )}

      {categories &&
        categories.length > 0 &&
        (!categoryIsPending || !recordIsPending) &&
        (!categoryIsFetching || !recordIsFetching) && (
          <div className="shadow-md p-5 bg-white dark:bg-gray-800 mb-6">
            <select
              id="categoryId"
              autoComplete="categoryId"
              className="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
              onChange={(e) => handleCategoryChange(parseInt(e.target.value))}
            >
              {(!categoryIsPending || !recordIsPending) &&
                (!categoryIsFetching || !recordIsFetching) &&
                categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        )}

      {filterdRecords &&
        filterdRecords.length === 0 &&
        !categoryIsPending &&
        !recordIsPending &&
        (!categoryIsFetching || !recordIsFetching) && (
          <div className="shadow-md p-5 bg-white dark:bg-gray-800 mb-6 max-h-screen overflow-y-auto">
            <p className="text-center font-bold text-gray-500 dark:text-cyan-500">
              No records found
            </p>
          </div>
        )}

      {filterdRecords &&
        filterdRecords.length > 0 &&
        (!categoryIsPending || !recordIsPending) &&
        (!categoryIsFetching || !recordIsFetching) && (
          <div className="shadow-md p-5 bg-white dark:bg-gray-800 mb-6 max-h-screen overflow-y-auto">
            {(!categoryIsPending || !recordIsPending) &&
              (!categoryIsFetching || !recordIsFetching) &&
              filterdRecords.map((record: any) => (
                <div
                  key={record.id}
                  className="shadow-md p-5 bg-white dark:bg-gray-900 mb-6"
                >
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-cyan-500">
                      Applicant Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-cyan-600">
                      Personal details and application.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-gray-100 dark:border-gray-700">
                    <dl className="divide-y divide-gray-100 dark:divide-gray-700">
                      <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                          Title
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-cyan-600">
                          {record.title}
                        </dd>
                      </div>
                      <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                          Username
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-cyan-600">
                          {record.username}
                        </dd>
                      </div>
                      <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                          Password
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-cyan-600">
                          {record.password}
                        </dd>
                      </div>
                      <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                          Url
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-cyan-600">
                          {record.url && (
                            <a href={record.url} target="_blank">
                              Click here to open url
                            </a>
                          )}
                        </dd>
                      </div>
                      <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                        <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                          Notes
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-cyan-600">
                          {record.notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
          </div>
        )}
    </>
  );
}

export default Dashboard;
