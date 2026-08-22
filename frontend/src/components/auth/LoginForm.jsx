import { useForm } from "react-hook-form";                             //Provides form handling features like: register, handleSubmit, errors
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";                                   //Shows success and error notifications.

import { login } from "../../features/auth/authAPI";

import {selectLoading} from "../../features/auth/authSelectors";

import Button from "../common/Button";
import Input from "../common/Input";

const LoginForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  const {
    register,                                                          //Registers every input
    handleSubmit,                                                      //Validates the form
    formState: { errors },                                            //Contains validation errors
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {                              //If API succeeds: fulfilled, Otherwise: rejected
      toast.success("Login Successful");
    } else {
      toast.error(result.payload  || "Something went wrong");
    }
  };

  return (
    //before onSubmit function, handleSubmit validates form, if valid -> onSubmit, else -> show errors
    <form onSubmit={handleSubmit(onSubmit)}>            

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        register={register}
        validation={{
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
            },
        }}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        register={register}
        validation={{
          required: "Password is required",
        }}
        error={errors.password}
      />

      <Button
        type="submit"
        loading={loading}
      >
        Login
      </Button>

    </form>
  );
};

export default LoginForm;