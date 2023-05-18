import "./App.css";
import { ZodType, z } from "zod";

type formData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<formData> = z
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

  return (
    <>
      <form className="formFlex gap-2">
        <div className="formFlex gap-1">
          <label htmlFor="fName">First Name :</label>
          <input type="text" />
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="lName">Last Name :</label>
          <input type="text" />
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="email">Email :</label>
          <input type="email" />
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="email">Age :</label>
          <input type="number" />
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="password">Password :</label>
          <input type="password" />
        </div>
        <div className="formFlex gap-1">
          <label htmlFor="confirm_password">Confirm Password :</label>
          <input type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
