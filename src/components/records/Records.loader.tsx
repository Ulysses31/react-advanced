// import {Styles} from './Records.module.css'

import { useForm } from "react-hook-form";
import { RecordDto } from "../../entities";
import RecordsService from "../../services/records.service";
import BaseLoader from "../base/Base.loader";
import ErrorMessage from "../error/ErrorMessage";

function RecordsLoader() {
  const defaultDto: RecordDto = {
    id: 0,
    categoryId: 0,
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  };

  const fetchDto = (id: number) => {
    return id > 0 ? new RecordsService().findById(id) : defaultDto;
  };

  const saveDto = async (id: number, dto: RecordDto) => {
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
      title="Category"
      queryFn={fetchDto}
      mutationFn={saveDto}
      myFormData={{ formData }}
    >
      <br />
      <br />
      <label htmlFor="id">Id: </label>&nbsp;
      <input type="text" {...register("id")} disabled />
      <br />
      <label htmlFor="categoryId">CategoryId: </label>&nbsp;
      <input type="text" {...register("categoryId")} disabled />
      <br />
      <label htmlFor="title">Title: </label>&nbsp;
      <input
        type="text"
        {...register("title", { required: "Title is required" })}
      />
      <ErrorMessage error={errors.title} />
      <br />
      <label htmlFor="username">Username: </label>&nbsp;
      <input
        type="text"
        {...register("username", { required: "Username is required" })}
      />
      <ErrorMessage error={errors.username} />
      <br />
      <label htmlFor="password">Password: </label>&nbsp;
      <input
        type="text"
        {...register("password", { required: "Password is required" })}
      />
      <ErrorMessage error={errors.password} />
      <br />
      <label htmlFor="url">Url: </label>&nbsp;
      <input type="url" {...register("url")} />
      <br />
      <label htmlFor="notes">Notes: </label>&nbsp;
      <textarea {...register("notes", { maxLength: 255 })}></textarea>
      <br />
      <br />
    </BaseLoader>
  );
}

export default RecordsLoader;
