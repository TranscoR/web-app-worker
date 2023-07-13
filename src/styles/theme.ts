import type { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { COLORS } from "../constants/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    // @ts-ignore
    altBackground?: boolean;
    // @ts-ignore
    palette?: {
      primary?: {
        main?: string;
      };
      secondary?: {
        main?: string;
      };
      background?: {
        default?: string;
        paper?: string;
      };
    };
  }

  export interface CommonColors {
    brightYellow: string;
    lavender: string;
    limeGreen: string;
    navy: string;
    magenta: string;
    slate: string;
    mistyDay: string;
    white: string;
    black: string;
    dawn: string;
    smoke: string;
    folly: string;
    silver: string;
    reddish: string;
    darkViolet: string;
    blue: string;
  }
}

// @ts-ignore
export const themeOptions: ThemeOptions = {
  altBackground: false,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: COLORS.brightYellow,
    },
    secondary: {
      main: COLORS.folly,
    },
    background: {
      default: COLORS.silver,
      paper: COLORS.white,
    },
    error: {
      main: COLORS.reddish,
    },
    common: {
      brightYellow: COLORS.brightYellow,
      lavender: COLORS.lavender,
      limeGreen: COLORS.limeGreen,
      navy: COLORS.navy,
      magenta: COLORS.magenta,
      slate: COLORS.slate,
      mistyDay: COLORS.mistyDay,
      white: COLORS.white,
      black: COLORS.black,
      dawn: COLORS.dawn,
      smoke: COLORS.smoke,
      folly: COLORS.folly,
      silver: COLORS.silver,
      reddish: COLORS.reddish,
      darkViolet: COLORS.darkViolet,
      blue: COLORS.blue,
    },
    text: {
      secondary: COLORS.blue,
      primary: COLORS.blue,
    },
    action: {
      disabledOpacity: 0.7,
      disabledBackground: COLORS.lavender,
      disabled: COLORS.white,
    },
  },
  typography: {
    body1: {
      // @ts-ignore
      fontSize: 14,
    },
    caption: {
      // @ts-ignore
      color: COLORS.darkViolet,
    },
    h1: {
      // @ts-ignore
      //   fontFamily: Montserrat,
      fontSize: "26px",
    },
    h2: {
      // @ts-ignore
      fontWeight: 400,
      color: COLORS.black,
    },
    h3: {
      // @ts-ignore
      fontWeight: 400,
      color: COLORS.black,
    },
    h4: {
      // @ts-ignore
      fontWeight: 500,
      color: COLORS.black,
    },
    // @ts-ignore
    body3: {
      // @ts-ignore
      fontSize: 12,
      lineHeight: "18px",
    },
    strong: {
      color: COLORS.darkViolet,
      fontSize: 14,
      lineHeight: "16px",
    },
    button: {
      // @ts-ignore
      color: COLORS.white,
      textTransform: "none",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0,
    },
    input: {
      // @ts-ignore
    },
  },
};

export default createTheme(themeOptions);
