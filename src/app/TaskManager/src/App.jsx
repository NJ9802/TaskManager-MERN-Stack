import { useState, createContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import StickyFooter from "./components/StickyFooter";
import { theme } from "./theme";

import Cookies from "universal-cookie";

export const AppContext = createContext();

const App = () => {
  const cookies = new Cookies();
  const host = "";

  // get cookie from browser if logged in
  const token = cookies.get("TOKEN");
  const userId = cookies.get("UserId");
  const admin = cookies.get("Admin");

  const [areToken, setAreToken] = useState(!token ? false : true);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          areToken,
          setAreToken,
          admin,
          host,
          userId,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#000" },
          }}
        >
          <CssBaseline />
          <Header />

          <Box component="main">
            <SnackbarProvider maxSnack={3}>
              <Routes>
                <Route path="/" element={areToken ? <Home /> : <Login />} />
                <Route
                  path="/admin"
                  element={areToken ? <Admin /> : <Navigate to="/" />}
                />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </SnackbarProvider>
          </Box>

          <StickyFooter />
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
