// import styles from './Base.loader.module.css'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useLocation } from "react-router-dom";

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

  const {
    formData: { handleSubmit, getValues, reset },
  } = myFormData;

  // Queries
  const qry = useQuery({
    retry: 0,
    queryKey: [title, idParam],
    queryFn: () => queryFn(idParam),
  });

  const { data, error, isLoading } = qry;

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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-500">
            {title} Form
          </h1>
        </div>
      </header>

      {isLoading && <p>Loading...</p>}

      {error && (
        <p>An error occurred {(error as AxiosError).response?.statusText}</p>
      )}

      {mutation.isError && <p>An error occurred {mutation.error.message}</p>}

      {mutation.isPending && <p>Submitting data...</p>}

      {mutation.isSuccess && <p>Successfully submitted data</p>}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {children}
          <button
            name="reload"
            type="button"
            style={{ padding: "5px", border: "1px solid #cdcdcd" }}
            onClick={() => reset(data)}
          >
            Reload
          </button>
          &nbsp;
          <button
            name="submit"
            type="submit"
            style={{ padding: "5px", border: "1px solid #cdcdcd" }}
            disabled={mutation.isPending && error != null}
          >
            Submit
          </button>
        </form>
      )}

      <br />

      <p>Mutation Status: {JSON.stringify(mutation.status, null, 2)}</p>

      <br />

      {data && <p>Query Data: {JSON.stringify(data, null, 2)}</p>}

      <br />

      <p>getValues: {JSON.stringify(getValues(), null, 2)}</p>
    </>
  );
}

export default BaseLoader;
