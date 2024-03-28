// import {Styles} from './Categories.module.css'

import { useForm } from "react-hook-form";
import { CategoryDto } from "../../entities";
import CategoriesService from "../../services/categories.service";
import BaseLoader from "../base/Base.loader";
import ErrorMessage from "../error/ErrorMessage";

function CategoriesLoader() {
  const defaultDto: CategoryDto = { id: 0, name: "", description: "" };

  const fetchDto = (id: number) => {
    return id > 0 ? new CategoriesService().findById(id) : defaultDto;
  };

  const saveDto = async (id: number, dto: CategoryDto) => {
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
      title="Category"
      queryFn={fetchDto}
      mutationFn={saveDto}
      myFormData={{ formData }}
    >
      <br />
      <br />
      <label htmlFor="name">Name: </label>
      &nbsp;
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
      />
      <ErrorMessage error={errors.name} />
      <br />
      <label htmlFor="description">Description: </label>
      &nbsp;
      <input type="text" {...register("description")} />
      <br />
      <br />
    </BaseLoader>
  );
}

export default CategoriesLoader;
