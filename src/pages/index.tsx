import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";
import {
    Button,
    Flex,
    Img,
    useDisclosure,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import animationLoading from "../animations/99109-loading.json";

import HeaderDesk from "../components/header/HeaderDesk";
import HeaderConferencia from "../components/conferencia/HeaderConferencia";
import TableComponent from "../components/conferencia/TableComponent";
import FooterConferencia from "../components/conferencia/FooterConferencia";
import ModalPrint from "../components/modals/ModalPrint";
import { getSoapData } from "../hooks/getSoapData";
import { ItemsTYPE } from "../types/itensType";
import ModalComponent from "../components/modals/ModalComponent";
import { postSoapData } from "../hooks/post/postSoapData";
import InputWithLabel from "../components/tools/InputWithLabel";
import ModalConfFinished from "../components/modals/ModalConfFinished";

export default function Scanner() {
    const [barcodeScan, setBarcodeScan] = useState<any>(
        "Nenhum código de barra escaneado"
    );
    const [verifyScanner, setVerifyScanner] = useState<Boolean>();
    const [eanError, setEanError] = useState<string>();
    const [qtd, setQtd] = useState<any>();
    const [checked, setChecked] = useState<any>();
    const [itens, setItens] = useState<ItemsTYPE | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<boolean>(false);
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
    const [numeroPedido, setNumeroPedido] = useState("");
    const [separador, setSeparador] = useState("");
    const [conferente, setConferente] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [initialTime, setInitialTime] = useState("");
    const [colorBorder, setColorBorder] = useState(false);

    // useEffect(() => {
    //     const res = itens?.every((prod) => prod?.qty === prod?.Conferido)
    //     res === true ? setIsAllChecked(true) : setIsAllChecked(false)
    // }, [itens]);

    const whenIsLoading = loading === true ? "flex" : "none";

    async function findOrder(order: string) {
        setItens(null);
        setLoading(true);
        const result: any = await getSoapData(order);
        console.log("result", result?.data);
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
            const resetedItens = itens?.orders.map((prod) => {
                return { ...prod, CONFERIDO: 0 };
            });
            setItens({ ...itens, orders: resetedItens });
        }
    }

    const toast = useToast({
        duration: 1500,
        isClosable: true,
        containerStyle: {
            color: "white",
        },
    });

    const {
        isOpen: isOpenPrinter,
        onOpen: onOpenPrinter,
        onClose: onClosePrinter,
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

    const loadingDefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationLoading,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    // function handleScanner() {
    //     const checkEAN = (Mock: any) => Mock.EAN === barcodeScan;
    //     if (itens !== null) {
    //         const result = itens.some(checkEAN);

    //         if (verifyScanner === true && result === true) {
    //             const mappedMock = itens?.map((prod) => {
    //                 if (prod?.barcode && prod?.barcode === barcodeScan) {
    //                     setBarcodeScan(null);
    //                     if (
    //                         prod?.barcode === barcodeScan &&
    //                         prod?.CONFERIDO + 1 > prod?qtd
    //                     ) {
    //                         setErrorMessage(true);
    //                         setEanError(prod?.barcode);
    //                         setQtd(prod?.qtd);
    //                         setChecked(prod?.CONFERIDO + 1);
    //                         setVerifyScanner(false);
    //                         // fetch("https://localhost:5001/ExpeditionScannerAPI");

    //                         return prod;
    //                     } else {
    //                         return { ...prod, CONFERIDO: prod.CONFERIDO + 1 };
    //                     }
    //                 } else {
    //                     setBarcodeScan(null);
    //                     return prod;
    //                 }
    //             });
    //             setItens(mappedMock);
    //         } else if (verifyScanner === true) {
    //             setBarcodeScan(null);
    //             // fetch("https://localhost:5001/ExpeditionScannerAPI");
    //         }
    //     }
    // }

    useEffect(() => {
        if (barcodeScan !== null) {
            // handleScanner();
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
                    // opacity={"50%"}
                >
                    <HeaderDesk />
                    {/* <Button onClick={() => teste()}>teste</Button> */}
                    <Flex
                        w="100%"
                        mt="2rem"
                        justify="space-evenly"
                        paddingBottom={"10px"}
                        borderBottom={"2px solid #E2E8F0"}
                    >
                        <Flex>
                            <InputWithLabel
                                value={numeroPedido}
                                setValue={setNumeroPedido}
                                text={"NÚMERO DO PEDIDO"}
                            />
                            <InputWithLabel
                                value={separador}
                                setValue={setSeparador}
                                text={"SEPARADOR"}
                                isDisabled={itens !== null ? false : true}
                                borderColor={colorBorder}
                            />
                            <InputWithLabel
                                value={conferente}
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
                                _hover={{
                                    bgColor: "#083b19",
                                }}
                                onClick={() => {
                                    findOrder(numeroPedido);
                                }}
                            >
                                Buscar
                            </Button>
                            <Flex w={"50%"}>
                                <Button
                                    // isDisabled={verifyScanner ? true : false}
                                    mr="1rem"
                                    w="full"
                                    bgColor={"#005F27"}
                                    color="white"
                                    _hover={{
                                        bgColor: "#083b19",
                                    }}
                                    onClick={() => {
                                        validateConf();
                                    }}
                                    disabled={
                                        itens !== null && !verifyScanner
                                            ? // separador.length > 0 && conferente.length > 0
                                              //     ? false
                                              //     :
                                              false
                                            : true
                                    }
                                >
                                    Iniciar conferência
                                </Button>

                                <Button
                                    isDisabled={!verifyScanner ? true : false}
                                    w="full"
                                    bgColor={"red"}
                                    color="white"
                                    _hover={{
                                        bgColor: "#b40505",
                                    }}
                                    onClick={() => {
                                        onOpenCancelConferencia();
                                    }}
                                >
                                    Cancelar conferencia
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* <HeaderConferencia
                        verifyScanner={verifyScanner}
                        setVerifyScanner={setVerifyScanner}
                        setBarcodeScan={setBarcodeScan}
                        findOrder={findOrder}
                        itens={itens}
                        resetItens={resetItens}
                    /> */}
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
                                    bgColor="#005F27"
                                    color="white"
                                    colorScheme={"green"}
                                    disabled={
                                        orderType
                                            ? isAllChecked
                                                ? false
                                                : true
                                            : true
                                    }
                                >
                                    GERAR ETIQUETAS
                                </Button>
                                <Button
                                    fontSize={"12px"}
                                    w="208px"
                                    mr="1rem"
                                    bgColor="#339CD8"
                                    color="white"
                                    colorScheme={"blue"}
                                    disabled={orderType ? false : true}
                                    onClick={() => resetItens()}
                                >
                                    ADICIONAR ITEM
                                </Button>
                                <Button
                                    fontSize={"12px"}
                                    mr="1rem"
                                    w="208px"
                                    bgColor="#F9B000"
                                    color="white"
                                    colorScheme={"yellow"}
                                    onClick={() => onOpenPrinter()}
                                    disabled={orderType ? false : true}
                                >
                                    IMPRIMIR ITENS PENDENTES
                                </Button>
                            </Flex>
                            <Button
                                fontSize={"12px"}
                                w="208px"
                                justifySelf="end"
                                bgColor="#005F27"
                                color="white"
                                colorScheme={"green"}
                                disabled={
                                    orderType
                                        ? false
                                        : isAllChecked
                                        ? false
                                        : true
                                }
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
                    <Flex h={"100vh"} justify={"center"} align={"center"}>
                        <Img
                            src="/Image/RS-icon.svg"
                            w={"220px"}
                            position={"absolute"}
                            mt={"140px"}
                            opacity={loading ? "70%" : "20%"}
                            // display={whenIsLoading}
                        />

                        <Spinner
                            thickness="10px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="red.400"
                            w="350px"
                            h="350px"
                            mt="150px"
                            display={whenIsLoading}
                        />
                    </Flex>
                )}
            </Flex>

            {/* <ModalError
                checked={checked}
                eanError={eanError}
                errorMessage={errorMessage}
                onCloseError={onCloseError}
                qtd={qtd}
                setErrorMessage={setErrorMessage}
            /> */}
            <ModalPrint isOpen={isOpenPrinter} onClose={onClosePrinter} />
            <ModalComponent
                Title={` Erro! - ${eanError}`}
                Phrase={`Você escaneou <b>${checked}</b> itens, porém a
                            quantidade correta é <b>${qtd}</b>. Por favor,
                            verifique novamente e tente escanear a quantidade de
                            itens correta.`}
                // TextButton="Cancelar"
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
        </Flex>
    );
}
