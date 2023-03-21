import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import { AppContext } from "../App";
import { colors } from "../theme";
import { loginUser } from "./Login";

// This function adds initial tasks to the user's list of tasks when they first log in.
const addInitialTasks = async (host) => {
  const cookies = new Cookies();

  const firstTasks = [
    { title: "Create", description: "You can Create a Task" },
    { title: "Update", description: "You can Edit a created Task" },
    { title: "Delete", description: "You can Delete a created Task" },
    {
      title: "Enjoy",
      description: "Feel free to try all the features of the App!!",
    },
  ];

  // try block for catching errors in fetch requests or cookie retrieval
  try {
    const token = await cookies.get("TOKEN");
    const userId = await cookies.get("UserId");

    // map through firstTasks array
    firstTasks.map(async (task) => {
      // send POST request with task data to API
      await fetch(`${host}/api/tasks/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
    });
  } catch (err) {
    // display toast with error message if error occurs
    toast(err.message, "error");
  }
};

// This function is used to register a user with the given values.
// It sends a POST request to the given host, with the username, password and admin status as body.
// If the request is successful, it displays a success message using the toast function.
// If an error occurs, it displays an error message using the toast function.
const registerUser = async (host, values, toast) => {
  const { username, password, admin } = values;

  try {
    const response = await fetch(`${host}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password, admin }),
    });

    const data = await response.json();

    if (response.status === 500) {
      toast(data.message, "error");
      return false;
    } else {
      toast(data.message, "success");

      return true;
    }
  } catch (err) {
    toast(err.message, "error");

    return false;
  }
};

const Register = () => {
  const navigate = useNavigate();
  const { setAreToken, host } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    admin: false,
  });

  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const toast = (message, variant) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 5000 });
  };

  // This function handles the submit action of register form.
  const handleSubmit = async (event) => {
    // Prevent the default action of the event (in this case, a form submission)
    event.preventDefault();

    // Check if the form is valid using handleValidation() function
    if (!handleValidation()) return;

    try {
      // Call registerUser() function to register a new user and store the result in isRegistered variable
      const isRegistered = await registerUser(host, values, toast);
      if (!isRegistered) return;

      // Call loginUser() function to login an existing user and store the result in isLogged variable
      const isLogged = await loginUser(host, values, toast);
      if (!isLogged) return;

      // Call addInitialTasks() function to add initial tasks for a new user
      await addInitialTasks(host);

      // Call setAreToken function from AppContext to update token status in global state
      setAreToken(true);

      // // Navigate back home after successful login attempt
      navigate("/");
    } catch (err) {
      // If an error occurs, call toast() to show an error message.
      toast(err.message, "error");
    }
  };

  // This function handles the change of the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // This function handles when the user clicks on the form to clean error messages
  const handleClick = () => {
    setValidUsername(true);
    setValidPassword(true);
    setValidConfirmPassword(true);
  };

  // This function handles validation of username, password and confirm password
  const handleValidation = () => {
    const { username, password, confirmPassword } = values;

    if (username.length < 3) {
      setValidUsername(false);
      return false;
    } else if (password.length < 3) {
      setValidPassword(false);
      return false;
    } else if (password !== confirmPassword) {
      setValidConfirmPassword(false);
      return false;
    }
    return true;
  };

  return (
    <Box display="flex" alignItems="center" height="calc(100vh - 200.04px)">
      <Box
        mx="auto"
        onClick={handleClick}
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
        <Typography
          variant="h6"
          onClick={() => setValues({ ...values, admin: true })}
        >
          Register
        </Typography>

        <TextField
          onChange={(event) => handleChange(event)}
          name="username"
          label="Username"
          variant="standard"
          error={validUsername ? false : true}
          helperText={
            validUsername
              ? undefined
              : "Username must be greater than 3 characters"
          }
        />
        <TextField
          onChange={(event) => handleChange(event)}
          name="password"
          label="Password"
          type="password"
          variant="standard"
          error={validPassword ? false : true}
          helperText={
            validPassword
              ? undefined
              : "Password must be greater than 3 characters"
          }
        />
        <TextField
          onChange={(event) => handleChange(event)}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="standard"
          error={validConfirmPassword ? false : true}
          helperText={
            validConfirmPassword ? undefined : "Passwords don't match."
          }
        />

        <Button type="submit" variant="contained" startIcon={<PersonAddIcon />}>
          Register
        </Button>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="0.3rem"
        >
          <Typography variant="body2">Have already an account?</Typography>
          <Link to="/auth/login">
            <Typography>Login</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
