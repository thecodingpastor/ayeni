import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

import classes from "./ContactForm.module.scss";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../components/form/validator";
import useForm from "../form/useForm";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const { FormState, onInputHandler } = useForm(
    {
      fullname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={classes.Container}>
      <h2>Hit Me Up</h2>
      <Input
        id="fullname"
        name="fullname"
        placeholder="Full Name"
        onInput={onInputHandler}
        label="Full Name"
        errorText="Fullname must be 5 -50 characters long."
        validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(50)]}
      />
      <Input
        name="email"
        id="email"
        placeholder="Email"
        onInput={onInputHandler}
        label="Email"
        errorText="Invalid Email"
        validators={[VALIDATOR_EMAIL()]}
      />
      <Input
        element="textarea"
        name="message"
        id="message"
        placeholder="Message"
        onInput={onInputHandler}
        label="Message"
        errorText="Message must be 5 - 300 characters long."
        validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(300)]}
      />
      <div className="text-center">
        <Button
          text="Send"
          type="submit"
          mode="pry"
          disabled={!FormState.formIsValid}
        />
      </div>
    </form>
  );
};

export default ContactForm;
