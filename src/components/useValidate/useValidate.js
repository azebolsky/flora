import { useState, useEffect } from "react";
import { auth, generateUserDocument } from "../../firebase";

const useValidate = (validateInfo) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const displayName = inputs.username;

  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      try {
        const email = inputs.email;
        const password = inputs.password;
        console.log(email, " ", password);
        await auth
          .createUserWithEmailAndPassword(inputs.email, inputs.password)
          .then(() => {
            generateUserDocument(auth.currentUser, { displayName });
          });
      } catch {
        setErrors("Unknown error signing up");
      }
    }
  }, [errors]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(validateInfo(inputs));
  }

  return { onChangeHandler, handleSubmit, errors, inputs };
};

export default useValidate;
