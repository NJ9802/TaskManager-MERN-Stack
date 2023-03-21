import { useRef } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "universal-cookie";
import { colors } from "../theme";
import { useEffect } from "react";

const TasksTable = ({ props }) => {
  const cookies = new Cookies();

  // Declare constants for each of the props passed into this component, and assign them the corresponding values from props
  const { tasks, host, toast, setValues, getTasks } = props;

  // Declare a constant variable called "token" and assign it the value of the TOKEN cookie from cookies
  const token = cookies.get("TOKEN");

  // Declare a scrollRef variable using useRef hook to store a reference to an element
  const scrollRef = useRef();

  // Use useEffect hook to call scrollToEnd function when tasks changes
  useEffect(() => {
    scrollToEnd();
  }, [tasks]);

  // Define a function called scrollToEnd that sets the scrollTop property of an element to its own scrollHeight property
  const scrollToEnd = () => {
    const scrollDiv = scrollRef.current;
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  };

  // Define an async function called handleDelete that takes in an id as argument and makes a DELETE request to delete task with that id
  const handleDelete = async (id) => {
    try {
      // Make DELETE request with specified headers and Authorization token from TOKEN cookie
      const response = await fetch(`${host}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Parse response as JSON object and store in data variable
      const data = await response.json();

      // Call toast function with status message from response data object as first argument and success as second argument (for styling)
      toast(data.status, "success");

      // Call getTasks prop function to update tasks list after task has been deleted
      getTasks();
    } catch (err) {
      // Call toast function with error message as first argument and error as second argument (for styling)
      toast(err.message, "error");
    }
  };

  const handleClick = (id, title, description) => {
    setValues({ id, title, description, tasks });
  };

  return (
    <TableContainer
      component={Paper}
      ref={scrollRef}
      sx={{
        maxHeight: 422,
        backgroundColor: colors.secondary[500],
        maxWidth: 480,
        scrollBehavior: "smooth",
      }}
    >
      <Table stickyHeader sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: colors.primary[300] }}>
              Title
            </TableCell>
            <TableCell sx={{ backgroundColor: colors.primary[300] }}>
              Description
            </TableCell>
            <TableCell sx={{ backgroundColor: colors.primary[300] }}>
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Box display="flex" gap="5px">
                  <IconButton
                    onClick={() =>
                      handleClick(row._id, row.title, row.description)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
