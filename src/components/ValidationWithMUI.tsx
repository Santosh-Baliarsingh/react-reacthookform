import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styles } from "./ValidationWithMui.style";
import defaultImg from "../assets/defaultImage.jpg";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const formData = localStorage.getItem("formData");
const ValidationWithMUI = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [formDataArray, setFormDataArray] = useState<FormData[]>([]);
  const [imageUrl, setImageUrl] = useState<string>(defaultImg);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageUrl(reader.result as string);
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
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          sx={styles.formBox}
        >
          <Box
            component="input"
            id="fileInput"
            display="none"
            type="file"
            onChange={handleImageUpload}
          />
          <Box
            component="img"
            src={imageUrl}
            sx={styles.defaultImg}
            alt="Click to select an image"
            onClick={() => document.getElementById("fileInput")?.click()}
            style={{ cursor: "pointer" }}
          />
          <TextField
            label="First Name"
            sx={styles.textfield}
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
            sx={styles.textfield}
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
            sx={styles.textfield}
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
          <Box>
            <TextField
              label="Password"
              sx={styles.textfield}
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required!",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter and one number, and must be between 6 and 15 characters long.",
                },
              })}
              onBlur={() => trigger("password")}
              error={Boolean(errors.password)}
              // helperText={errors.password?.message}
            />
            <Box sx={styles.passwordstyle}>{errors.password?.message}</Box>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
      {formData && (
        <Box sx={styles.cardContainer}>
          <Box sx={styles.heading}>User Details</Box>
          <Box sx={styles.logindetailscontainer}>
            <Box sx={styles.cardbox}>
              {formDataArray.map((data, index) => (
                <Box sx={styles.card} key={index}>
                  <Box
                    component="img"
                    sx={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                    }}
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
        </Box>
      )}
    </Box>
  );
};

export default ValidationWithMUI;
