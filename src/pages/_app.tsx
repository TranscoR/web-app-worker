import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
