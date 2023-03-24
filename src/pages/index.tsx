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

export default function Scanner() {
    const [barcodeScan, setBarcodeScan] = useState<any>(
        "Nenhum código de barra escaneado"
    );
    const [verifyScanner, setVerifyScanner] = useState<Boolean>();
    const [errorMessage, setErrorMessage] = useState<any>(false);
    const [eanError, setEanError] = useState<string>();
    const [qtd, setQtd] = useState<any>();
    const [checked, setChecked] = useState<any>();
    const [itens, setItens] = useState<ItemsTYPE | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<boolean>(false);
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

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

    async function teste() {
        const a = await postSoapData("7333");
        console.log("b", a);
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
                    <HeaderConferencia
                        verifyScanner={verifyScanner}
                        setVerifyScanner={setVerifyScanner}
                        setBarcodeScan={setBarcodeScan}
                        findOrder={findOrder}
                        itens={itens}
                        resetItens={resetItens}
                    />
                </Flex>

                {itens !== null ? (
                    <>
                        <TableComponent
                            arrayItens={itens}
                            setArrayItens={setItens}
                        />
                        <FooterConferencia
                            imprimirModal={onOpenPrinter}
                            resetItens={resetItens}
                            orderType={orderType}
                            isAllChecked={isAllChecked}
                            itens={itens}
                        />
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

            <ModalPrint isOpen={isOpenPrinter} onClose={onClosePrinter} />
            {/* <ModalError
                checked={checked}
                eanError={eanError}
                errorMessage={errorMessage}
                onCloseError={onCloseError}
                qtd={qtd}
                setErrorMessage={setErrorMessage}
            /> */}
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
        </Flex>
    );
}
