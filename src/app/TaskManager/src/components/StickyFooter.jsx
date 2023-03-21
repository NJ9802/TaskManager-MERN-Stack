import { Box, IconButton, Typography, Container, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { colors } from "../theme";

const Copyright = () => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/NJ9802">
          My Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {"Picture from "}
        <Link
          color="inherit"
          href="https://www.freepik.es/vector-gratis/colorido-pack-listas-to-do_3134974.htm#query=check%20list&from_query=tasks&position=30&from_view=search&track=sph"
        >
          Freepik
        </Link>
      </Typography>
    </Box>
  );
};

const StickyFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: colors.gray[400],
      }}
    >
      <Container maxWidth="sm">
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: "1rem" }}>
            Contact Me!
          </Typography>

          <Link href="https://twitter.com/NJ9802">
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Link>

          <Link href="https://t.me/NelsonJavier9802">
            <IconButton>
              <TelegramIcon />
            </IconButton>
          </Link>

          <Link href="https://github.com/NJ9802">
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </Link>

          <Link href="https://linkedin.com/in//NJ9802">
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Link>

          <Link href="mailto:nelsonjavier9802@gmail.com">
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Link>
        </Box>
        <Copyright />
      </Container>
    </Box>
  );
};

export default StickyFooter;
