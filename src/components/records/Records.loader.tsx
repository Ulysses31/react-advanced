// import {Styles} from './Records.module.css'

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RecordDto } from "../../entities";
import CategoriesService from "../../services/categories.service";
import RecordsService from "../../services/records.service";
import BaseLoader from "../base/Base.loader";
import ErrorMessage from "../shared/FormValidationErrorMessage";

function RecordsLoader() {
  const title = "Records";
  const defaultDto: RecordDto = {
    id: 0,
    categoryId: 0,
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  };

  // get categories
  const { data } = useQuery({
    retry: 0,
    queryKey: ["Categories"],
    queryFn: () => new CategoriesService().findAll(),
  });

  const fetchDto = (id: number) => {
    return id > 0 ? new RecordsService().findById(id) : defaultDto;
  };

  const saveDto = async (id: number, dto: RecordDto) => {
    dto.id = Number(dto.id);
    dto.categoryId = Number(dto.categoryId);
    if (id === 0) return new RecordsService().create(dto as RecordDto);
    if (id > 0) return new RecordsService().update(id, dto as RecordDto);
    return Promise.resolve(dto);
  };

  // Form
  const formData = useForm({
    defaultValues: defaultDto,
  });

  const {
    register,
    formState: { errors },
  } = formData;

  return (
    <BaseLoader
      title={title}
      queryFn={fetchDto}
      mutationFn={saveDto}
      myFormData={{ formData }}
    >
      <div className="space-y-12 p-2">
        <div className="pb-7">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-cyan-500">
            {title} Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-cyan-600">
            Fill the name and description of the category
          </p>

          <div className="border-t border-gray-900/10 dark:border-gray-600 mt-5 pt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="id"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Id
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="id"
                  autoComplete="id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("id")}
                  disabled={true}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="categoryId"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                CategoryId
              </label>
              <div className="mt-2">
                <select
                  id="categoryId"
                  autoComplete="categoryId"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("categoryId")}
                >
                  {data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Title*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <ErrorMessage error={errors.title} />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Username*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <ErrorMessage error={errors.username} />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Password*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="password"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <ErrorMessage error={errors.password} />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="url"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="url"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("url")}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  rows={3}
                  className="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("notes", { maxLength: 255 })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLoader>
  );
}

export default RecordsLoader;
