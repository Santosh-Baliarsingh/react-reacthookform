import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const ValidationWithMUI = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [formDataArray, setFormDataArray] = useState<FormData[]>([]);

  const handleBlur = async () => {
    const result = await trigger("password");
    const errorMessage = await errors.password?.message;
    if (result) {
      setErrorMessages((prevState) =>
        prevState.filter((msg) => msg !== errorMessage)
      );
    } else {
      if (errorMessage) {
        setErrorMessages((prevState) => [...prevState, errorMessage]);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.table(data);
    const existingData = localStorage.getItem("formData");
    const formDataArray = existingData ? JSON.parse(existingData) : [];
    data.image = image as string; 
    formDataArray.push(data);
    localStorage.setItem("formData", JSON.stringify(formDataArray));
    reset();
    location.reload();
  };

  useEffect(() => {
    const existingData = localStorage.getItem("formData");
    if (existingData) {
      setFormDataArray(JSON.parse(existingData));
    }
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      sx={{ margin: "10px 0" }}
    >
      <input type="file" onChange={handleImageUpload} />
      <TextField
        label="First Name"
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
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
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
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Email"
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
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
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
        onBlur={handleBlur}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <ol>
        {errorMessages.map((message, index) => (
          <li key={index} style={{ color: errors.password ? "red" : "green" }}>
            {message}
          </li>
        ))}
      </ol>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Box>
        <Box>Login Details</Box>
        {formDataArray.map((data, index) => (
            <Box key={index}>
              <Box
                component="img"
                sx={{ width: "200px", height : '200px', borderRadius: "50%" }}
                src={data.image}
                alt="Uploaded"
              />
            <Box>First Name: {data.firstName}</Box>
            <Box>Last Name: {data.lastName}</Box>
            <Box>Email: {data.email}</Box>
            <Box>Password: {data.password}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ValidationWithMUI;
