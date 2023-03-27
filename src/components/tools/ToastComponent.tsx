import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default function ToastComponent() {
    const toast = useToast();

    const showErrorToast = () => {
        toast({
            title: "Erro!",
            description: "Ocorreu um erro ao processar a sua solicitação.",
            status: "error",
            duration: 1500,
            isClosable: true,
            containerStyle: {
                color: "white",
            },
        });
    };

    useEffect(() => {
        showErrorToast();
    }, []);

    return null;
}
