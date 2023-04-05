import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import TasksTable from "./TasksTable";
import { AppContext } from "../App";
import ResumeText from "./ResumeText";
import Form from "./Form";
import { colors } from "../theme";

const Home = () => {
  const { AbortController } = window;
  let abortController;

  // Get the token from cookies
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const { host, userId } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  // Set headers for fetch requests with Authorization header set to Bearer token
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Set initial values for state variables
  const [values, setValues] = useState({
    title: "",
    description: "",
    id: "",
    tasks: [],
  });

  const [scroll, setScroll] = useState(false);

  // Toast function to display messages with variant and autoHideDuration of 3 seconds
  const toast = (message, variant) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  };

  // Fetch tasks from api and set values state variable to returned tasks
  const getTasks = async () => {
    try {
      abortController = new AbortController();
      const response = await fetch(`${host}/api/tasks/${userId}`, {
        headers,
        signal: abortController.signal,
      });
      const tasks = await response.json();

      setValues({ title: "", description: "", id: "", tasks });
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const fetcher = async ({ query, method, bodyData }) => {
    const response = await fetch(`${host}/api/tasks/${query}`, {
      method,
      headers,
      body: JSON.stringify(bodyData),
    });

    const data = response.json();
    return data;
  };

  // Handle submit of form - if "id" is present update task else create task
  const handleSubmit = async (event) => {
    event.preventDefault();

    let data;

    try {
      if (values.id) {
        data = await fetcher({
          query: values.id,
          method: "PUT",
          bodyData: values,
        });
      } else {
        data = await fetcher({
          query: userId,
          method: "POST",
          bodyData: { ...values, user: userId },
        });
      }

      toast(data.status, "success");
      await getTasks();
      !values.id && setScroll(true);
    } catch (err) {
      toast(err.message, "error");
    }
  };

  // The handleChange function is used to update the values in the state.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // Using useEffect hook to call getTasks function when component mounts.
  // The empty array as a second argument ensures that this only happens once
  // when component mounts.
  useEffect(() => {
    getTasks();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" gap={10} p="2rem">
        <ResumeText />

        <Box display={{ xs: "none", md: "block" }}>
          <img
            src="/tasks.jpg"
            alt="Tasks"
            style={{ maxHeight: "400px", borderRadius: "1rem" }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="1000px"
        minHeight="700px"
        borderRadius="1.5rem"
        m="auto"
        mb="2rem"
        backgroundColor={colors.primary[400]}
      >
        <Box
          sx={{
            m: "1.5rem",
            p: "1rem",
            borderRadius: "1rem",
            boxShadow: 2,
            backgroundColor: colors.primary[300],
          }}
        >
          <Typography variant="h4">Task Manager</Typography>
        </Box>

        <Box display={{ md: "flex" }} justifyContent={{ md: "center" }}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box m="2rem">
              <Typography variant="h4">
                {values.id ? "Update" : "Add a"} Task
              </Typography>
            </Box>

            <Form props={{ handleSubmit, handleChange, values }} />
          </Box>

          <Box display="flex" alignItems="center" flexDirection="column">
            <Box m="2rem">
              <Typography variant="h4">Tasks</Typography>
            </Box>

            <Box sx={{ px: "1.5rem", mb: "20px" }}>
              <TasksTable
                props={{
                  host,
                  tasks: values.tasks,
                  toast,
                  getTasks,
                  setValues,
                  scroll,
                  setScroll,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
