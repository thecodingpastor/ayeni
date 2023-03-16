import useForm from "../../components/form/useForm";

import {
  CreateBlogFormInitialState,
  CreateBlogFormInputs,
} from "./CreateBlogFormInputs";

import Input from "../../components/form/Input";
import Spin from "../../components/loaders/Spin";
import Button from "../../components/form/Button";

const CreateBlogForm = () => {
  // Content should be from the WYSIWYg
  const { FormState, onInputHandler } = useForm(
    CreateBlogFormInitialState,
    false
  );
  const {
    inputs: { title, description, image_url },
    formIsValid,
  } = FormState;

  let userLoading;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{ maxWidth: "70rem", margin: "0 auto" }}
    >
      {CreateBlogFormInputs.map((input) => (
        <Input
          key={input.id}
          id={input.id}
          name={input.name}
          placeholder={input.placeholder}
          onInput={onInputHandler}
          label={input.placeholder}
          errorText={input.errorText}
          validators={input.validators}
          type={input.type}
          element={input.element}
        />
      ))}

      <div
        className="text-center"
        style={{
          height: "5rem",
          marginBottom: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!userLoading ? (
          <Button
            text="Create Blog"
            type="submit"
            mode="pry"
            disabled={!formIsValid}
          />
        ) : (
          <Spin white />
        )}
      </div>
    </form>
  );
};

export default CreateBlogForm;
