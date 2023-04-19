import { Flex, Input, Button, useToast, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

type ChangeConferidoType = {
    index: any;
    arrayItens: any;
    setArrayItens: any;
    verifyScanner: boolean | undefined;
};

export default function ChangeConferido({
    arrayItens,
    setArrayItens,
    index,
    verifyScanner,
}: ChangeConferidoType) {
    const [qtdConferido, setQtdConferido] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const toast = useToast({
        duration: 3000,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    function changeConferidoQTD() {
        const newArrayItens = { ...arrayItens };
        const teste = newArrayItens?.orders.map((prod: any, i: any) => {
            if (i === index) {
                if (qtdConferido > prod?.qty) {
                    toast({
                        title: "Atualização negada",
                        description:
                            "A quantidade do conferido não pode ser maior que a quantidade.",
                        status: "error",
                    });
                    return prod;
                } else {
                    setIsVisible(true);
                    return { ...prod, checked: qtdConferido };
                }
            } else {
                return prod;
            }
        });
        newArrayItens.orders = teste;

        setArrayItens(newArrayItens);
    }

    return (
        <Flex w={"100%"} justify={"center"}>
            <Tooltip
                display={!verifyScanner ? "flex" : "none"}
                label="Inicie a conferencia"
            >
                <Input
                    disabled={!verifyScanner}
                    ml={"-10px"}
                    type={"number"}
                    w={"45px"}
                    size={"sm"}
                    value={qtdConferido === 0 ? "" : qtdConferido}
                    border={"none"}
                    borderBottom={".5px solid black"}
                    _focusVisible={{ borderBottom: "1px solid black" }}
                    onChange={(e) => {
                        setQtdConferido(parseInt(e.target.value));
                        setIsVisible(false);
                    }}
                />
            </Tooltip>
            <Flex
                ml={"15px"}
                align={"center"}
                justify={"space-evenly"}
                w={"80px"}
                // visibility={"hidden"}
                // display={isVisible ? "flex" : "none"}
                gap={"10px"}
            >
                <BsCheck
                    size={"25px"}
                    visibility={
                        isVisible
                            ? "hidden"
                            : qtdConferido > 0
                            ? "visible"
                            : "hidden"
                    }
                    onClick={() => changeConferidoQTD()}
                    color={"green"}
                    cursor={"pointer"}
                />
                <AiOutlineClose
                    size={"20px"}
                    visibility={
                        isVisible
                            ? "hidden"
                            : qtdConferido > 0
                            ? "visible"
                            : "hidden"
                    }
                    onClick={() => setQtdConferido(0)}
                    color={"red"}
                    cursor={"pointer"}
                />
            </Flex>
        </Flex>
    );
}
