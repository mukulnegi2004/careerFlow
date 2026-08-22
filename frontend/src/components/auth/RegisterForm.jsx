import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { register as registerUser } from "../../features/auth/authAPI";

import {selectLoading} from "../../features/auth/authSelectors";

import Button from "../common/Button";
import Input from "../common/Input";

const RegisterForm = () => {                          
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;
    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration Successful");
      reset();
    } else {
      toast.error(result.payload  || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input
        label="Name"
        name="name"
        placeholder="Enter name"
        register={register}
        validation={{
          required: "Name is required",
        }}
        error={errors.name}
      />

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
          minLength: {
            value: 6,
            message: "Minimum 6 characters",
          },
        }}
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        register={register}
        validation={{
          required: "Confirm password",
          validate: (value) =>
            value === password || "Passwords do not match",
        }}
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        loading={loading}
      >
        Create Account
      </Button>

    </form>
  );
};

export default RegisterForm;