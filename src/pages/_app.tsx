import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastProvider } from "@chakra-ui/toast";
import "../styles/global/global.scss";

import { defaultTheme } from "../styles/theme.ts";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={defaultTheme} resetCSS cssVarsRoot="body">
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}
