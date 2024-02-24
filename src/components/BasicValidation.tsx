import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const BasicValidation = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.table(data);
    const existingData = localStorage.getItem("formData");
    const formDataArray = existingData ? JSON.parse(existingData) : [];
    formDataArray.push(data);
    localStorage.setItem("formData", JSON.stringify(formDataArray));
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName", {
              required: "FirstName is required!",
              minLength: {
                value: 5,
                message: "FirstName should be at least 5 characters!",
              },
              maxLength: {
                value: 10,
                message: 'FirstName should not exceed 10 characters!",',
              },
            })}
            onBlur={() => {
              trigger("firstName");
            }}
          />
          {errors.firstName && (
            <p style={{ color: "red", margin: "10px 0" }}>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="firstName">LastName</label>
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName", {
              required: "LastName is required!",
              minLength: {
                value: 5,
                message: "LastName should be at least 5 characters!",
              },
              maxLength: {
                value: 15,
                message: 'LastName should not exceed 10 characters!",',
              },
            })}
            onBlur={() => {
              trigger("lastName");
            }}
          />
          {errors.lastName && (
            <p style={{ color: "red", margin: "10px 0" }}>
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required!",
              },
              pattern: {
                value:
                  /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid Email Address",
              },
            })}
            onBlur={() => {
              trigger("email");
            }}
          />
          {errors.email && (
            <p style={{ color: "red", margin: "10px 0" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required!",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number, and must be between 6 and 15 characters long",
              },
            })}
            onBlur={() => {
              trigger("password");
            }}
          />
          {errors.password && (
            <p style={{ color: "red", margin: "10px 0" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default BasicValidation;
