import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { ItemsTYPE } from "../types/itensType";

type ChangeConferidoType = {
  index: any;
  arrayItens: any;
  setArrayItens: any;
};

export default function ChangeConferido({
  arrayItens,
  setArrayItens,
  index,
}: ChangeConferidoType) {
  const [qtdConferido, setQtdConferido] = useState(0);

  const toast = useToast({
    duration: 3000,
    isClosable: true,
    containerStyle: {
      color: "white",
      textStyle: "BarlowRegular",
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
        // display={qtdConferido > 0 ? "flex" : "none"}
        gap={"10px"}
      >
        <BsCheck
          size={"25px"}
          visibility={qtdConferido > 0 ? "visible" : "hidden"}
          onClick={() => changeConferidoQTD()}
          color={"green"}
          cursor={"pointer"}
        />
        <AiOutlineClose
          size={"20px"}
          visibility={qtdConferido > 0 ? "visible" : "hidden"}
          onClick={() => setQtdConferido(0)}
          color={"red"}
          cursor={"pointer"}
        />
      </Flex>
    </Flex>
  );
}
