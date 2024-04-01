// import {Styles} from './Categories.module.css'

import { useForm } from "react-hook-form";
import { CategoryDto } from "../../entities";
import CategoriesService from "../../services/categories.service";
import BaseLoader from "../base/Base.loader";
import ErrorMessage from "../shared/FormValidationErrorMessage";

function CategoriesLoader() {
  const title = "Categories";
  const defaultDto: CategoryDto = { id: 0, name: "", description: "" };

  const fetchDto = (id: number) => {
    return id > 0 ? new CategoriesService().findById(id) : defaultDto;
  };

  const saveDto = async (id: number, dto: CategoryDto) => {
    dto.id = Number(dto.id);
    if (id === 0) return new CategoriesService().create(dto as CategoryDto);
    if (id > 0) return new CategoriesService().update(id, dto as CategoryDto);
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
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Name*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("name", { required: "Name is required" })}
                />
                <ErrorMessage error={errors.name} />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-cyan-600"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="description"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-500"
                  {...register("description")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLoader>
  );
}

export default CategoriesLoader;
