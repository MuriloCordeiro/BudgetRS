import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { ItemsTYPE, Order } from "../types/itensType";

type ChangeConferidoType = {
    index: any;
    arrayItens: Order[];
    setArrayItens: any;
    id: string;
    checkedProduct: Order[];
    setCheckedProduct: any;
};

export default function ChangeQty({
    arrayItens,
    setArrayItens,
    index,
    id,
    checkedProduct,
    setCheckedProduct,
}: ChangeConferidoType) {
    const [qtdConferido, setQtdConferido] = useState(0);

    function changeConferidoQTD() {
        let newArrayItens = arrayItens;
        let newCheckedProduct = checkedProduct;
        const teste = newArrayItens?.map((prod, i) => {
            if (i === index) {
                return { ...prod, qty: qtdConferido };
            } else {
                return prod;
            }
        });

        const teste1 = newCheckedProduct?.map((prod, i) => {
            if (prod?.itemCode === id) {
                return { ...prod, qty: qtdConferido };
            } else {
                return prod;
            }
        });

        setArrayItens(teste);
        setCheckedProduct(teste1);
    }

    return (
        <Flex w={"100%"} justify={"start"}>
            <Input
                // ml={"-10px"}
                type={"number"}
                w={"45px"}
                size={"sm"}
                value={qtdConferido === 0 ? "" : qtdConferido}
                border={"none"}
                borderBottom={".5px solid black"}
                // borderRadius={"15px"}
                // bg={"white"}
                _focusVisible={{ borderBottom: "1px solid black" }}
                onChange={(e) => setQtdConferido(parseInt(e.target.value))}
            />
            <Flex
                ml={"15px"}
                w={"80px"}
                gap={"10px"}
                align={"center"}
                justify={"space-evenly"}
                display={qtdConferido > 0 ? "flex" : "none"}
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
