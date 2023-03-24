import { Flex, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

type ChangeConferidoType = {
    index: any;
    arrayItens: any[];
    setArrayItens: any;
};

export default function ChangeConferido({
    arrayItens,
    setArrayItens,
    index,
}: ChangeConferidoType) {
    const [qtdConferido, setQtdConferido] = useState(0);

    function changeConferidoQTD() {
        const newArrayItens = arrayItens;
        const teste = newArrayItens.map((prod, i) => {
            if (i === index) {
                return { ...prod, CONFERIDO: qtdConferido };
            } else {
                return prod;
            }
        });

        setArrayItens(teste);
    }

    return (
        <Flex w={"100%"} justify={"start"}>
            <Input
                ml={"-10px"}
                type={"number"}
                w={"45px"}
                size={"sm"}
                value={qtdConferido === 0 ? "" : qtdConferido}
                border={"none"}
                borderBottom={".5px solid black"}
                _focusVisible={{ borderBottom: "1px solid black" }}
                onChange={(e) => setQtdConferido(parseInt(e.target.value))}
            />
            <Flex
                ml={"15px"}
                align={"center"}
                justify={"space-evenly"}
                w={"80px"}
                display={qtdConferido > 0 ? "flex" : "none"}
                gap={"10px"}
            >
                <BsCheck
                    size={"25px"}
                    onClick={() => changeConferidoQTD()}
                    color={"green"}
                    cursor={"pointer"}
                />
                <AiOutlineClose
                    size={"20px"}
                    onClick={() => setQtdConferido(0)}
                    color={"red"}
                    cursor={"pointer"}
                />
            </Flex>
        </Flex>
    );
}
