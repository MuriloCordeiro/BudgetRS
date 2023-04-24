// import { AuthProvider } from "firebase/auth";
import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from "react";

import { User } from "firebase/auth";

// import { auth } from "../services/firebase";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Toast } from "@chakra-ui/react";
import { ValidateAuth } from "../hooks/post/postValidateAuth";
import { useRouter } from "next/router";

type AuthContextData = {
    signInEmailPasswordWebservices: any;
    isLoading: boolean | undefined;
    isLoged: boolean | null;
    setIsLoged: any;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isLoged, setIsLoged] = useState<boolean | null>(null);
    const CLIENT_TOKEN: any = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
    const COOKIE_MAX_AGE: any = process.env.NEXT_PUBLIC_CLIENT_MAX_AGE;
    const cookies = parseCookies();
    const userToken = cookies[CLIENT_TOKEN];

    async function signInEmailPasswordWebservices(
        email: string,
        password: string
    ): Promise<void> {
        try {
            setIsLoading(true);
            const response = await ValidateAuth(email, password);
            setIsLoged(response?.data?.authenticated);
            const isAuthenticated = response && response.data.authenticated;
            await handleSessionCookie(isAuthenticated);
            setIsLoading(false);
        } catch {
            console.error("error");
        }
    }

    function handleSessionCookie(isAuthenticated: boolean) {
        if (isAuthenticated === true) {
            setCookie(undefined, CLIENT_TOKEN, isAuthenticated.toString(), {
                maxAge: COOKIE_MAX_AGE,
                path: "/",
            });

            Router.push("/homepage");
        } else {
            destroyCookie(userToken as any, CLIENT_TOKEN);
            Router.push("/");
        }
    }

    useEffect(() => {
        userToken
            ? console.log("salvou o cookie", userToken)
            : Router.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userToken]);

    return (
        <AuthContext.Provider
            value={{
                signInEmailPasswordWebservices,
                isLoading,
                isLoged,
                setIsLoged,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}
