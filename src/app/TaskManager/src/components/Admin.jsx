import { useEffect, useState, useContext } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import { AppContext } from "../App";
import { colors } from "../theme";

const Row = ({ props }) => {
  const user = props.user;

  // Use React Hooks to update the checked state when the checkbox is clicked
  // Set the initial state of the checkbox to the value of the user's admin property
  const [checked, setChecked] = useState(user.admin);

  // Handler for when the checkbox is clicked, update the checked state to its opposite value
  // and call a function to update user's admin status in database
  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.setUserAdmin(user._id, !checked);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {user.username}
      </TableCell>

      <TableCell>
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          inputProps={{ "aria-label": "admin" }}
        />
      </TableCell>

      <TableCell>
        <IconButton onClick={() => props.handleDelete(user._id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const Admin = () => {
  const { AbortController } = window;
  let abortController;

  // Get the token from the cookies
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const { host } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  // Set users state to an empty array to store users data later on.
  const [users, setUsers] = useState([]);

  // Set headers for authorization and content type
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Use effect hook to call getUsers function when component is mounted for first time
  useEffect(() => {
    getUsers();

    // cancel any pending requests when the component is unmounted
    return () => {
      abortController.abort();
    };
  }, []);

  // Function to show toast messages with a variant and a duration of 3 seconds
  const toast = (message, variant) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };

  // Function to get all users from the API
  const getUsers = async () => {
    try {
      abortController = new AbortController();

      const response = await fetch(`${host}/api/users`, {
        signal: abortController.signal,
        headers,
      });

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      toast(err.message, "error");
    }
  };

  // Function to delete a user given its ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${host}/api/users/${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json();

      toast(data.message, "success");

      getUsers();
    } catch (err) {
      toast(err, "error");
    }
  };

  // Function to set an user as admin given its ID and admin status (true or false).
  const setUserAdmin = async (id, admin) => {
    try {
      const response = await fetch(`${host}/api/users/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ admin }),
      });

      const data = await response.json();

      toast(data.message, "success");

      getUsers();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <Box m="10px auto" maxWidth="400px">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "540px", backgroundColor: colors.secondary[500] }}
      >
        <Table stickyHeader sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: colors.primary[300] }}>
                Username
              </TableCell>

              <TableCell sx={{ backgroundColor: colors.primary[300] }}>
                Admin
              </TableCell>

              <TableCell sx={{ backgroundColor: colors.primary[300] }}>
                Options
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <Row
                key={user._id}
                props={{ user, setUserAdmin, handleDelete }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Admin;
