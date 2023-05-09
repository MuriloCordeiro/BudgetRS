import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/global/global.scss";
import { defaultTheme } from "../styles/theme.ts";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={defaultTheme} resetCSS cssVarsRoot="body">
      <AuthProvider>
        <title>Sistema de Orçamento RS</title>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
