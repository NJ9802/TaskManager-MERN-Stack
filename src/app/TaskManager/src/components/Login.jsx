import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import { AppContext } from "../App";
import { colors } from "../theme";

export const loginUser = async (host, values, toast) => {
  const cookies = new Cookies();
  const { username, password } = values;

  // Make a fetch request to the login endpoint with the username and password from state as body data
  const response = await fetch(`${host}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  // Parse response as json
  const data = await response.json();
  if (data.token) {
    // Set token cookie with path / so it's accessible everywhere on site
    cookies.set("TOKEN", data.token, { path: "/" });
    cookies.set("UserId", data.userId, { path: "/" });
    if (data.admin) {
      cookies.set("Admin", data.admin, { path: "/" });
    }
    return true;
  } else {
    // Show an error snackbar if no token is received in response data
    toast(data.message, "error");
    return false;
  }
};

const Login = () => {
  const { setAreToken, host } = useContext(AppContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // Function to show a snackbar with a message and variant
  const toast = (message, variant) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 5000 });
  };

  // Handle submit of form when user tries to log in
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const isLogged = await loginUser(host, values, toast);

      if (isLogged) {
        // Call setAreToken function from AppContext to update token status in global state
        setAreToken(true);

        // // Navigate back home after successful login attempt
        navigate("/");
      }
    } catch (err) {
      toast(err.message, "error");
    }
  };

  // This function is used to handle changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Box display="flex" alignItems="center" height="calc(100vh - 200.04px)">
      <Box
        mx="auto"
        onSubmit={(event) => handleSubmit(event)}
        component="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="1rem"
        sx={{
          backgroundColor: colors.secondary[500],
          p: "2rem",
          borderRadius: "2rem",
          maxWidth: "350px",
        }}
      >
        <Typography variant="h6">Login</Typography>

        <TextField
          onChange={(event) => handleChange(event)}
          name="username"
          label="Username"
          variant="standard"
        />
        <TextField
          onChange={(event) => handleChange(event)}
          name="password"
          label="Password"
          type="password"
          variant="standard"
        />

        <Button type="submit" variant="contained" startIcon={<LoginIcon />}>
          Login
        </Button>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="0.3rem"
        >
          <Typography variant="body2">Haven't an account?</Typography>
          <Link to="/auth/register">
            <Typography>Sign up</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
