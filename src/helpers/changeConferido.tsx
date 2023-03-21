import { Flex, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

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
        newArrayItens[index].CONFERIDO = qtdConferido;
        console.log("entrou aq", qtdConferido, newArrayItens);

        setArrayItens(newArrayItens);

        // const teste = [
        //     {
        //         CONFERIDO: 0,
        //     },
        //     {
        //         CONFERIDO: 0,
        //     },
        // ];
        // teste[0]?.CONFERIDO = 1
    }

    return (
        <Flex w={"100%"} justify={"start"}>
            <Input
                type={"number"}
                w={"50px"}
                value={qtdConferido}
                onChange={(e) => setQtdConferido(parseInt(e.target.value))}
            />
            <Flex ml={"25px"} justify={"space-between"} w={"150px"}>
                <Button
                    display={qtdConferido > 0 ? "flex" : "none"}
                    w={"60px"}
                    onClick={() => changeConferidoQTD()}
                >
                    Confirm
                </Button>
                <Button
                    display={qtdConferido > 0 ? "flex" : "none"}
                    w={"60px"}
                    onClick={() => setQtdConferido(0)}
                >
                    Cancel
                </Button>
            </Flex>
        </Flex>
    );
}
