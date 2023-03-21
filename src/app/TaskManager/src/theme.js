import { createTheme } from "@mui/material";

export const colors = {
  primary: {
    100: "#f6ede3",
    200: "#eedac7",
    300: "#e5c8ab",
    400: "#ddb58f",
    500: "#d4a373",
    600: "#aa825c",
    700: "#7f6245",
    800: "#55412e",
    900: "#2a2117",
  },

  secondary: {
    100: "#fefbf5",
    200: "#fdf8eb",
    300: "#fcf4e1",
    400: "#fbf1d7",
    500: "#faedcd",
    600: "#c8bea4",
    700: "#968e7b",
    800: "#645f52",
    900: "#322f29",
  },

  gray: {
    100: "#f5f7ef",
    200: "#ebeedf",
    300: "#e0e6ce",
    400: "#d6ddbe",
    500: "#ccd5ae",
    600: "#a3aa8b",
    700: "#7a8068",
    800: "#525546",
    900: "#292b23",
  },

  white: {
    100: "#fffef9",
    200: "#fffdf3",
    300: "#fefcec",
    400: "#fefbe6",
    500: "#fefae0",
    600: "#cbc8b3",
    700: "#989686",
    800: "#66645a",
    900: "#33322d",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
    },
    secondary: {
      main: colors.secondary[500],
    },

    neutral: {
      dark: colors.gray[700],
      main: colors.gray[500],
      light: colors.gray[100],
    },

    background: {
      default: colors.white[500],
    },
  },

  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
});
