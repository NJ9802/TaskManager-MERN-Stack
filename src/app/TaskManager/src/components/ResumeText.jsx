import { Box, Typography } from "@mui/material";

const ResumeText = () => {
  return (
    <Box
      mt="1rem"
      px="0.8rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      maxWidth="500px"
    >
      <Typography variant="h5">Welcome!</Typography>
      <Typography variant="body1" align="justify">
        Task Manager is a simple web application built on the{" "}
        <strong>MERN Stack </strong>
        that allows users to perform{" "}
        <strong>CRUD operations on the database</strong>, while utilizing{" "}
        <strong>JWT authentication</strong> to protect access to the{" "}
        <strong>API</strong>.
      </Typography>

      <Typography variant="body1" align="justify">
        As a testament to the developer's growing expertise in web development,
        Task Manager showcases the ability to create{" "}
        <strong>dynamic, responsive, and efficient web applications</strong>.{" "}
      </Typography>

      <Typography variant="body1" align="justify">
        The application is a great <strong>starting point</strong> for those
        looking to delve into web development, providing a solid foundation for
        learning more about the MERN Stack and web development in general.{" "}
      </Typography>

      <Typography variant="body1" align="justify">
        The application is available on <strong>Docker Hub</strong> and can be
        run using <strong>Docker Compose</strong>.{" "}
      </Typography>
    </Box>
  );
};

export default ResumeText;
