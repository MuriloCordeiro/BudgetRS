import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";
import {
    Button,
    Flex,
    Img,
    useDisclosure,
    useToast,
    Spinner,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import animationLoading from "../animations/99109-loading.json";

import HeaderDesk from "../components/header/HeaderDesk";
import TableComponent from "../components/conferencia/TableComponent";
import FooterConferencia from "../components/conferencia/FooterConferencia";
import ModalPrint from "../components/modals/ModalPrint";
import { getSoapData } from "../hooks/get/getSoapData";
import { ItemsTYPE, Order } from "../types/itensType";
import ModalComponent from "../components/modals/ModalDeleteItem";
import { postSoapData } from "../hooks/post/postSoapData";
import InputWithLabel from "../components/tools/InputWithLabel";
import ModalConfFinished from "../components/modals/ModalConfFinished";
import ModalNewOrder from "../components/modals/ModalNewOrder";
import LayoutDesk from "../components/Layouts/layoutDesktop";
import ModalTags from "../components/modals/ModalTags";

export default function Scanner() {
    const [barcodeScan, setBarcodeScan] = useState<any>(
        "Nenhum código de barra escaneado"
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [verifyScanner, setVerifyScanner] = useState<Boolean>();
    const [eanError, setEanError] = useState<string>();
    const [qtd, setQtd] = useState<any>();
    const [checked, setChecked] = useState<any>();
    const [itens, setItens] = useState<ItemsTYPE>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<boolean>(false);
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
    const [numeroPedido, setNumeroPedido] = useState("");
    const [separador, setSeparador] = useState("");
    const [conferente, setConferente] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [initialTime, setInitialTime] = useState("");
    const [colorBorder, setColorBorder] = useState(false);

    const wideVersion = useBreakpointValue({
        md: false,
        lg: true,
    });

    console.log("orderType", orderType);
    useEffect(() => {
        const res = itens?.orders?.every((prod) => prod?.qty === prod?.checked);
        res === true ? setIsAllChecked(true) : setIsAllChecked(false);
    }, [itens]);

    const whenIsLoading = loading === true ? "flex" : "none";

    async function findOrder(order: string) {
        setItens(null as unknown as ItemsTYPE);
        setLoading(true);
        const result: any = await getSoapData(order);
        result !== undefined && setItens(result?.data);
        result !== undefined &&
            setOrderType(
                result?.data?.general?.ordertype === "REDE" ? true : false
            );
        setLoading(false);
        console.log(
            "orderType",
            result?.data?.general?.ordertype,
            result?.data?.general?.ordertype === "REDE" ? true : false
        );
    }

    function resetItens() {
        if (itens !== null) {
            const resetedItens = itens?.orders?.map((prod) => {
                return { ...prod, CONFERIDO: 0 };
            });
            setItens({ ...itens, orders: resetedItens });
        }
    }

    const toast = useToast({
        duration: 3000,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    const {
        isOpen: isOpenPrints,
        onOpen: onOpenPrints,
        onClose: onClosePrints,
    } = useDisclosure();

    const {
        isOpen: isOpenTags,
        onOpen: onOpenTags,
        onClose: onCloseTags,
    } = useDisclosure();
    const {
        isOpen: isOpenError,
        onOpen: onOpenError,
        onClose: onCloseError,
    } = useDisclosure();

    const {
        isOpen: isOpenFinishConf,
        onOpen: onOpenFinishConf,
        onClose: onCloseFinishConf,
    } = useDisclosure();

    const {
        isOpen: isOpenCancelConferencia,
        onOpen: onOpenCancelConferencia,
        onClose: onCloseCancelConferencia,
    } = useDisclosure();

    const {
        isOpen: isOpenNewSearch,
        onOpen: onOpenNewSearch,
        onClose: onCloseNewSearch,
    } = useDisclosure();

    const {
        isOpen: isOpenNewOrder,
        onOpen: onOpenNewOrder,
        onClose: onCloseNewOrder,
    } = useDisclosure();

    function handleScanner() {
        const checkEAN = (Mock: any) => Mock.barcode === barcodeScan;

        if (itens !== null) {
            const newArrayItens = { ...itens };
            const result = newArrayItens?.orders?.some(checkEAN);
            console.log("chegoue aq", result);
            if (verifyScanner === true && result === true) {
                const mappedMock = newArrayItens?.orders?.map((prod) => {
                    if (prod?.barcode && prod?.barcode === barcodeScan) {
                        console.log(
                            "olha, chegou aq tbm",
                            prod?.barcode,
                            barcodeScan
                        );
                        setBarcodeScan(null);
                        if (
                            prod?.barcode === barcodeScan &&
                            prod?.checked + 1 > prod?.qty
                        ) {
                            setErrorMessage(`Você escaneou <b>${checked}</b> itens, porém a
                            quantidade correta é <b>${qtd}</b>. Por favor,
                            verifique novamente e tente escanear a quantidade de
                            itens correta.`);
                            onOpenError();
                            setEanError(prod?.barcode);
                            setQtd(prod?.qty);
                            setChecked(prod?.checked + 1);
                            setVerifyScanner(false);
                            // fetch(
                            //     "https://localhost:5001/ExpeditionScannerAPI"
                            // );

                            return prod;
                        } else {
                            return { ...prod, checked: prod.checked + 1 };
                        }
                    } else {
                        setBarcodeScan(null);
                        return prod;
                    }
                });
                newArrayItens.orders = mappedMock;
                setItens(newArrayItens);
            } else if (verifyScanner === true) {
                setErrorMessage(
                    `Voce escaneou um pedido que não existe na lista de pedido Você escaneou o pedido ${barcodeScan}`
                );
                onOpenError();
                setBarcodeScan(null);
                // fetch("https://localhost:5001/ExpeditionScannerAPI");
            }
        }
    }

    useEffect(() => {
        console.log("att", itens);
    }, [itens]);

    useEffect(() => {
        if (barcodeScan !== null) {
            handleScanner();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barcodeScan]);

    if (typeof window !== "undefined") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useScanDetection({
            onComplete: (barcode): any => {
                if (verifyScanner === true) {
                    setBarcodeScan(barcode.trim());
                    console.log("barcode", barcode);
                } else {
                    setBarcodeScan("Nenhum código válido escaneado");
                }
            },
            preventDefault: false,
            minLength: 13,
            stopPropagation: true,
        });
    }

    useEffect(() => {
        if (verifyScanner === true) {
            toast({
                title: "Verificação Iniciada.",
                description: "O scanner foi habilitado.",
                status: "success",
            });
        } else if (verifyScanner === false) {
            toast({
                title: "Verificação Finalizada.",
                description: "O scanner foi desabilitado.",
                status: "error",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verifyScanner]);

    async function sendInsertOrders() {
        const currentDates = new Date();
        const currentHourInMinutes =
            currentDates.getHours() * 60 + currentDates.getMinutes();
        const objOrder = {
            orderId: itens?.general?.orderId,
            checker: conferente,
            separator: separador,
            date: currentDate,
            initialTime: initialTime,
            endTime: currentHourInMinutes.toString(),
            allChecked: isAllChecked.toString(),
        };
        const resp = await postSoapData(objOrder);
        console.log("sendInsertOrders", resp);
    }

    function validateConf() {
        if (separador.length === 0 && conferente.length === 0) {
            setColorBorder(true);
            toast({
                title: "Input vazio",
                description: "Separador e Conferente precisam ser preenchidos.",
                status: "error",
            });
        } else {
            setVerifyScanner(true);
            setColorBorder(false);
        }

        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = currentDate.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;

        const currentDates = new Date();
        const currentHourInMinutes =
            currentDates.getHours() * 60 + currentDates.getMinutes();

        setCurrentDate(formattedDate);
        setInitialTime(currentHourInMinutes.toString());
    }

    function cancelConf() {
        setVerifyScanner(false);
        setBarcodeScan("Nenhum código de barra escaneado");
        resetItens();
        setSeparador("");
        setConferente("");
        setCurrentDate("");
        setInitialTime("");
        //acontece
    }

    function remaingItens(checkedItens: Order[]) {
        const newArrayItens = { ...itens };
        newArrayItens?.orders?.push(...checkedItens);
        console.log("teste", newArrayItens);
        setItens(newArrayItens);
    }

    return (
        <Flex height="100vh" display="flex" flexDirection="column">
            <Flex direction="column">
                <Flex
                    p="2rem"
                    position={"fixed"}
                    w={"100%"}
                    top={0}
                    bg={"white"}
                    h={"160px"}
                    justify={"center"}
                    direction="column"
                    zIndex={15}
                >
                    <HeaderDesk />
                    <Flex
                        w="100%"
                        mt="2rem"
                        justify="space-evenly"
                        paddingBottom={"10px"}
                        borderBottom={"2px solid #E2E8F0"}
                        gap="1rem"
                    >
                        <Flex gap="1rem">
                            <InputWithLabel
                                value={numeroPedido}
                                width={wideVersion ? "200px" : "full"}
                                setValue={setNumeroPedido}
                                text={"NÚMERO DO PEDIDO"}
                            />
                            <InputWithLabel
                                value={separador}
                                width={wideVersion ? "200px" : "full"}
                                setValue={setSeparador}
                                text={"SEPARADOR"}
                                isDisabled={itens !== null ? false : true}
                                borderColor={colorBorder}
                            />
                            <InputWithLabel
                                value={conferente}
                                width={wideVersion ? "200px" : "full"}
                                setValue={setConferente}
                                text={"CONFERENTE"}
                                isDisabled={itens !== null ? false : true}
                                borderColor={colorBorder}
                            />
                        </Flex>
                        <Flex justify={"space-between"} w={"100%"}>
                            <Button
                                isDisabled={
                                    numeroPedido.length > 3 ? false : true
                                }
                                mr="1rem"
                                w="100px"
                                bgColor={"#005F27"}
                                color="white"
                                textStyle={"MontserratBold"}
                                fontSize={"12px"}
                                _hover={{
                                    opacity: "80%",
                                }}
                                onClick={() => {
                                    if (itens === null) {
                                        findOrder(numeroPedido);
                                    } else {
                                        onOpenNewSearch();
                                    }
                                }}
                            >
                                BUSCAR
                            </Button>
                            <Flex>
                                <Button
                                    // isDisabled={verifyScanner ? true : false}
                                    mr="1rem"
                                    w="full"
                                    bgColor={"#005F27"}
                                    color="white"
                                    textStyle={"MontserratBold"}
                                    fontSize={"12px"}
                                    _hover={{
                                        opacity: "80%",
                                    }}
                                    onClick={() => {
                                        validateConf();
                                        // handleScanner();
                                    }}
                                    disabled={
                                        itens !== null && !verifyScanner
                                            ? false
                                            : true
                                    }
                                >
                                    INICIAR CONFERÊNCIA
                                </Button>

                                <Button
                                    isDisabled={!verifyScanner ? true : false}
                                    w="full"
                                    bgColor={"red.900"}
                                    textStyle={"MontserratBold"}
                                    fontSize={"12px"}
                                    color="white"
                                    _hover={{
                                        opacity: "80%",
                                    }}
                                    onClick={() => {
                                        onOpenCancelConferencia();
                                    }}
                                >
                                    CANCELAR CONFERÊNCIA
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                {itens !== null ? (
                    <>
                        <TableComponent
                            arrayItens={itens}
                            setArrayItens={setItens}
                        />
                        <Flex
                            fontFamily={"Montserrat"}
                            justifyContent={"center"}
                            position={"fixed"}
                            w={"100%"}
                            bottom={0}
                            bg={"white"}
                            h={"70px"}
                            align={"center"}
                            p="2rem"
                            // paddingTop={"10px"}
                            borderTop={"2px solid #E2E8F0"}
                        >
                            <Flex w="full" justify="start">
                                <Button
                                    fontSize={"12px"}
                                    w="208px"
                                    mr="1rem"
                                    textStyle={"MontserratBold"}
                                    bgColor="#005F27"
                                    color="white"
                                    colorScheme={"green"}
                                    onClick={() => onOpenTags()}
                                    // disabled={orderType ? false : true}
                                    disabled={isAllChecked ? true : false}
                                    // disabled={
                                    //     orderType
                                    //         ? isAllChecked
                                    //             ? false
                                    //             : true
                                    //         : true
                                    // }
                                >
                                    GERAR ETIQUETAS
                                </Button>
                                <Button
                                    fontSize={"12px"}
                                    w="208px"
                                    mr="1rem"
                                    bgColor="#339CD8"
                                    color="white"
                                    textStyle={"MontserratBold"}
                                    colorScheme={"blue"}
                                    disabled={orderType ? false : true}
                                    onClick={() => onOpenNewOrder()}
                                >
                                    ADICIONAR ITEM
                                </Button>
                                <Button
                                    fontSize={"12px"}
                                    mr="1rem"
                                    w="208px"
                                    bgColor="#F9B000"
                                    textStyle={"MontserratBold"}
                                    color="white"
                                    colorScheme={"yellow"}
                                    onClick={() => onOpenPrints()}
                                >
                                    IMPRIMIR RELATÓRIO DE ITENS
                                </Button>
                            </Flex>
                            <Button
                                fontSize={"12px"}
                                w="208px"
                                justifySelf="end"
                                bgColor="#005F27"
                                color="white"
                                textStyle={"MontserratBold"}
                                colorScheme={"green"}
                                // disabled={
                                //     orderType
                                //         ? false
                                //         : isAllChecked
                                //         ? false
                                //         : true
                                // }
                                onClick={() => onOpenFinishConf()}
                            >
                                SEPARAÇÃO CONCLUÍDA
                            </Button>
                            <ModalConfFinished
                                isOpen={isOpenFinishConf}
                                onClose={onCloseFinishConf}
                                isAllChecked={isAllChecked}
                                itens={itens}
                                sendInsertOrders={sendInsertOrders}
                            />
                        </Flex>
                    </>
                ) : (
                    <Flex
                        h={"90vh"}
                        justify={"center"}
                        align={"center"}
                        mt={"10vh"}
                    >
                        <Img
                            src="/Image/RS-icon.svg"
                            w={"220px"}
                            position={"absolute"}
                            // mt={"140px"}
                            opacity={loading ? "70%" : "20%"}
                            // display={whenIsLoading}
                        />
                        <Spinner
                            thickness="10px"
                            speed="0.65s"
                            // position={"absolute"}
                            emptyColor="gray.200"
                            color="red.400"
                            w="350px"
                            h="350px"
                            // mt="150px"
                            display={whenIsLoading}
                        />
                    </Flex>
                )}
            </Flex>
            <ModalTags
                isOpen={isOpenTags}
                onClose={onCloseTags}
                itens={itens}
                orderNumber={numeroPedido}
            />
            <ModalNewOrder
                isOpen={isOpenNewOrder}
                onClose={onCloseNewOrder}
                func={remaingItens}
                itens={itens}
            />
            <ModalComponent
                Title={`Nova conferencia`}
                Phrase={`CONFERENCIA DO PEDIDO ${numeroPedido} NÃO FOI CONCLUIDA, DESEJA BUSCAR OUTRO PEDIDO?`}
                TextButton="Buscar"
                func={() => findOrder(numeroPedido)}
                isOpen={isOpenNewSearch}
                onClose={onCloseNewSearch}
            />
            <ModalComponent
                Title={` Erro! - ${eanError}`}
                Phrase={errorMessage}
                isOpen={isOpenError}
                onClose={onCloseError}
            />
            <ModalComponent
                Title="Cancelar Conferencia"
                Phrase={`Deseja cancelar a conferencia do pedido ${itens?.general?.orderId}`}
                TextButton="Cancelar"
                func={cancelConf}
                isOpen={isOpenCancelConferencia}
                onClose={onCloseCancelConferencia}
            />
            <ModalPrint
                isOpen={isOpenPrints}
                onClose={onClosePrints}
                itens={itens}
            />
        </Flex>
    );
}
