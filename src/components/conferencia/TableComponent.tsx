import {
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    Td,
    Text,
    Tbody,
    Flex,
    Tooltip,
    useDisclosure,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import ChangeConferido from "../../helpers/changeConferido";
import { ItemsTYPE } from "../../types/itensType";
import ModalComponent from "../modals/ModalComponent";
import { BiEditAlt } from "react-icons/bi";

type TableComponentType = {
    arrayItens: ItemsTYPE;
    setArrayItens: any;
};

export default function TableComponent({
    arrayItens,
    setArrayItens,
}: TableComponentType) {
    const [itemSelect, setItemSelect] = useState<any>(null);
    const [isRemaing, setIsRemaing] = useState<any>(null);

    const wideVersion = useBreakpointValue({
        md: false,
        lg: true,
    });

    function calcularPorcentagem(numero1: number, numero2: number): number {
        const porcentagem = (numero2 / numero1) * 100;
        return Number(porcentagem.toFixed(2));
    }

    function deleteRemaningIten(id: string, isRemaing: boolean) {
        const itens = { ...arrayItens };
        const deleteItem = itens?.orders?.filter(
            (prod) => prod?.itemCode !== id && isRemaing === true
        );

        itens.orders = deleteItem;

        setArrayItens(itens);
    }
    const {
        isOpen: isOpenDeleteItem,
        onOpen: onOpenDeleteItem,
        onClose: onCloseDeleteItem,
    } = useDisclosure();

    return (
        <TableContainer mt="160px" paddingX="2rem" paddingY="3.5rem">
            <Table variant="striped" size="md">
                <Thead w={"100%"}>
                    <Tr
                        w={"100%"}
                        position={"fixed"}
                        bg={"white"}
                        mt={"-3.5rem"}
                        zIndex={1}
                    >
                        <Flex w={"100%"}>
                            <Th w={wideVersion ? "7%" : "8%"}>itemID</Th>
                            <Th w={wideVersion ? "39%" : "27%"}>ITENS</Th>
                            <Th w={wideVersion ? "5%" : "7%"}>END 1</Th>
                            <Th w={wideVersion ? "5%" : "7%"}>END 2</Th>
                            {/* <Th w={wideVersion ? "" : ""} "7%">CID/EST</Th> */}
                            <Th w={wideVersion ? "10%" : "10%"}>EAN</Th>
                            <Th w={wideVersion ? "8%" : "7%"}>QTD</Th>
                            <Th w={wideVersion ? "13%" : "17%"}>CONFERIDO</Th>
                            <Th w={wideVersion ? "5%" : "5%"}>%</Th>
                            <Th w={wideVersion ? "5%" : "5%"}></Th>
                        </Flex>
                    </Tr>
                </Thead>
                {/* {console.log("arrayItens", arrayItens)} */}
                <Tbody
                    fontFamily={"Arial"}
                    fontSize={wideVersion ? "16px" : "14px"}
                >
                    {arrayItens?.orders.map((prod, index) => (
                        <Tr key={index}>
                            <Td w={wideVersion ? "7%" : "7%"}>
                                <Tooltip
                                    fontFamily={"Arial"}
                                    label={
                                        prod?.remaining
                                            ? "Este é um item pendente"
                                            : ""
                                    }
                                    borderRadius={"15px"}
                                >
                                    <Text
                                        cursor={
                                            prod?.remaining ? "help" : "false"
                                        }
                                        // textAlign={"center"}
                                        bgColor={
                                            prod?.remaining ? "#F9B000" : "none"
                                        }
                                        padding={"5px"}
                                        borderRadius={"15px"}
                                    >
                                        {prod?.itemCode}
                                    </Text>
                                </Tooltip>
                            </Td>
                            <Td w={wideVersion ? "41%" : "28%"}>
                                <Tooltip
                                    fontFamily={"Arial"}
                                    label={wideVersion ? "" : prod?.description}
                                    borderRadius={"15px"}
                                >
                                    <Text>
                                        {wideVersion
                                            ? prod?.description
                                            : prod?.description
                                                  .substring(0, 40)
                                                  .trim()}
                                        {wideVersion ? "" : "..."}
                                    </Text>
                                </Tooltip>
                            </Td>
                            <Td w={wideVersion ? "5%" : "5%"}>
                                {prod?.address1
                                    ? prod?.address1.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            <Td w={wideVersion ? "5%" : "5%"}>
                                {prod?.address2
                                    ? prod?.address2.replace(/\|/g, "")
                                    : "-"}
                            </Td>
                            {/* <Td w={wideVersion ? "" : ""} "6%">{prod?.city ? prod?.city : "-"}</Td> */}
                            <Td w={wideVersion ? "11%" : "11%"}>
                                {prod?.barcode ? prod?.barcode : "-"}
                            </Td>
                            <Td w={wideVersion ? "8%" : "8%"}>{prod?.qty}</Td>
                            <Td w={wideVersion ? "12%" : "20%"}>
                                {prod?.barcode === null &&
                                prod?.checked !== prod?.qty ? (
                                    <ChangeConferido
                                        arrayItens={arrayItens}
                                        setArrayItens={setArrayItens}
                                        index={index}
                                    />
                                ) : (
                                    <Text w={"100%"} ml={"25px"}>
                                        {prod?.checked}
                                    </Text>
                                )}
                            </Td>
                            <Td w={wideVersion ? "5%" : "5%"}>
                                <Text
                                    textAlign={"center"}
                                    bg={
                                        calcularPorcentagem(
                                            prod?.qty,
                                            prod?.checked
                                        ) === 100
                                            ? "#005F27"
                                            : "#F9B000"
                                    }
                                    paddingY={"5px"}
                                    paddingX={"15px"}
                                    borderRadius={"15px"}
                                    textColor={"white"}
                                >
                                    {calcularPorcentagem(
                                        prod?.qty,
                                        prod?.checked
                                    )}
                                    %
                                </Text>
                            </Td>
                            <Td w={wideVersion ? "5%" : "5%"}>
                                <BiEditAlt
                                    // visibility={
                                    //     prod?.remaining ? "visible" : "hidden"
                                    // }
                                    opacity={"50%"}
                                    size={"25px"}
                                    cursor={"pointer"}
                                    // onClick={
                                    //     () => {
                                    //         setIsRemaing(prod?.remaining);
                                    //         setItemSelect(prod?.itemCode);
                                    //         onOpenDeleteItem();
                                    //     }
                                    // deleteRemaningIten(
                                    //     prod?.itemCode,
                                    //     prod?.remaining
                                    // )
                                    // }
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ModalComponent
                Title="Deletar Item Pendente"
                Phrase={`Deseja deletar o item pendente do id ${itemSelect}?`}
                TextButton="Deletar"
                func={() => deleteRemaningIten(itemSelect, isRemaing)}
                isOpen={isOpenDeleteItem}
                onClose={onCloseDeleteItem}
            />
        </TableContainer>
    );
}
