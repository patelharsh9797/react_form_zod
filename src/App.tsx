import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const [finalData, setFinalData] = useState("");

  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(8).max(18),
      confirmPassword: z.string().min(8).max(18),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match ",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: FormData) => {
    console.log(data);
    setFinalData(JSON.stringify(data));
  };

  return (
    <div className="formFlex gap-2">
      <div>FinalData : {finalData != "" ? finalData : "Not Submitted Yet"}</div>
      <form
        onSubmit={handleSubmit((data) => submitHandler(data))}
        className="formFlex gap-2"
      >
        <div className="formFlex gap-1">
          <label htmlFor="fName">First Name :</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName?.message && (
            <span className="errorMsg">{errors.firstName.message}</span>
          )}
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="lName">Last Name :</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName?.message && (
            <span className="errorMsg">{errors.lastName.message}</span>
          )}
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="email">Email :</label>
          <input type="email" {...register("email")} />
          {errors.email?.message && (
            <span className="errorMsg">{errors.email.message}</span>
          )}
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="email">Age :</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age?.message && (
            <span className="errorMsg">{errors.age.message}</span>
          )}
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="password">Password :</label>
          <input type="password" {...register("password")} />
          {errors.password?.message && (
            <span className="errorMsg">{errors.password.message}</span>
          )}
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="confirm_password">Confirm Password :</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword?.message && (
            <span className="errorMsg">{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
