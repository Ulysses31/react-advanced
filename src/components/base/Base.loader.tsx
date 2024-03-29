// import styles from './Base.loader.module.css'

import { ArrowPathIcon, ServerIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { navigation } from "../../template/NavBar";

interface BaseLoaderProps {
  children: any;
  title: string;
  queryFn: (id: number) => any;
  mutationFn: (id: number, dto: any) => Promise<any>;
  myFormData: {
    formData: UseFormReturn<any>;
  };
}

function BaseLoader({
  children,
  title,
  queryFn,
  mutationFn,
  myFormData,
}: BaseLoaderProps) {
  const location = useLocation();
  const idParam: number = Number(location.pathname.split("/")[2]);
  const queryClient = useQueryClient();
  const [showModel, setShowModel] = useState(false);
  const GetIcon: any = () =>
    navigation
      .find((item: any) => {
        return item.name === title;
      })
      ?.icon({}, 7, 7);

  const {
    formData: { handleSubmit, getValues, reset },
  } = myFormData;

  // Queries
  const qry = useQuery({
    retry: 0,
    queryKey: [title, idParam],
    queryFn: () => queryFn(idParam),
  });

  const { data, error, isLoading, isFetching } = qry;

  // Mutations
  const mutation = useMutation({
    mutationFn: async (dto: any) => await mutationFn(idParam, dto),
    onMutate: (newDto) => {
      console.log("onMutate", newDto);
    },
    onError: (error, data, context) => {
      console.log("onError", error);
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", idParam, data);
      queryClient.invalidateQueries(qry);
      if (idParam === 0)
        window.location.href = `/${location.pathname.split("/")[1]}`;
    },
  });

  useEffect(() => {
    console.log("Form Init.....");
    reset(data);
    return () => {};
  }, [data]);

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <>
      <header className="bg-white shadow-md mb-6">
        <div className="flex place-content-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex text-2xl font-bold tracking-tight text-gray-500">
            <GetIcon />
            {title} form
          </h1>
          <div className="flex space-x-2">
            {/* <ArrowPathIcon
              className="h-8 w-8 inline-block text-cyan-600 cursor-pointer"
              visibility={idParam === 0 ? "hidden" : "visible"}
              onClick={() => refetch()}
            /> */}
            <ServerIcon
              className="h-8 w-8 inline-block text-cyan-600 cursor-pointer"
              onClick={() => setShowModel(!showModel)}
            />
          </div>
        </div>
      </header>

      {(isLoading || isFetching) && (
        <p className="flex m-5 justify-center place-items-center font-bold text-gray-400">
          <ArrowPathIcon className="h-8 w-8 inline-block text-cyan-600 mr-2 animate-spin" />
          Loading...
        </p>
      )}

      {error && (
        <div className="flex-col p-10 place-content-center text-center bg-white shadow-md space-y-2">
          <h2 className="font-bold text-4xl text-red-500">Error</h2>
          <p className="font-normal text-lg text-gray-500">
            An error occurred {(error as AxiosError).response?.statusText}
          </p>
        </div>
      )}

      {mutation.isError && (
        <div className="flex-col p-10 place-content-center text-center bg-white shadow-md space-y-2">
          <h2 className="font-bold text-4xl text-red-500">Error</h2>
          <p className="font-normal text-lg text-gray-500">
            An error occurred {mutation.error.message}
          </p>
        </div>
      )}

      {showModel && (
        <div>
          {!isLoading && !isFetching && (
            <pre className="bg-white p-3 h-72 mb-6 overflow-auto shadow-md">
              <code className="text-sm">
                {data && JSON.stringify(data, null, 2)}
              </code>
            </pre>
          )}
        </div>
      )}

      {mutation.isPending && (
        <p className="flex m-5 justify-center place-items-center font-bold text-gray-400">
          Submitting data...
        </p>
      )}

      {mutation.isSuccess && !mutation.isIdle && (
        <p className="flex m-5 justify-center place-items-center font-bold text-gray-400">
          Successfully submitted data
        </p>
      )}

      {!isLoading && !isFetching && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {children}
          <div className="border border-1 bg-white p-3 flex justify-end space-x-2 shadow-md">
            <button
              name="reload"
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => reset(data)}
            >
              Reset
            </button>
            &nbsp;
            <button
              name="submit"
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={mutation.isPending && error != null}
            >
              Submit
            </button>
          </div>
        </form>
      )}

      <br />

      <p>Mutation Status: {JSON.stringify(mutation.status, null, 2)}</p>
      {data && <p>Query Data: {JSON.stringify(data, null, 2)}</p>}
      <p>getValues: {JSON.stringify(getValues(), null, 2)}</p>
    </>
  );
}

export default BaseLoader;
