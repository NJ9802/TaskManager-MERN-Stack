import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "../theme";

const Form = ({ props }) => {
  const values = props.values;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        mx: "2rem",
        p: "2rem",
        maxWidth: "355px",
        borderRadius: "2rem",
        boxShadow: 1,
        backgroundColor: colors.secondary[500],
      }}
      component="form"
      onSubmit={(e) => props.handleSubmit(e)}
    >
      <TextField
        id="title"
        name="title"
        value={values.title}
        label="Title"
        variant="standard"
        onChange={(event) => props.handleChange(event)}
      />

      <TextField
        id="description"
        name="description"
        value={values.description}
        label="Description"
        multiline
        maxRows={4}
        variant="standard"
        onChange={(event) => props.handleChange(event)}
      />

      <Button
        disabled={values.title && values.description ? false : true}
        type="submit"
        variant="contained"
        startIcon={values.id ? <EditIcon /> : <AddIcon />}
      >
        {values.id ? "update task" : "add task"}
      </Button>
    </Box>
  );
};

export default Form;
