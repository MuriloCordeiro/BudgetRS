import {
  Flex,
  Image,
  Box,
  Text,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { destroyCookie, parseCookies } from "nookies";

export default function HeaderDesk() {
  const cookies = parseCookies();
  const CLIENT_TOKEN: any = process.env.NEXT_PUBLIC_CLIENT_TOKEN;
  const userToken = cookies[CLIENT_TOKEN];

  const Router = useRouter();

  const { asPath } = useRouter();

  const wideVersion = useBreakpointValue({
    md: false,
    lg: true,
  });

  return (
    <>
      <Flex
        mr="2rem"
        bgColor="white"
        w="4%"
        h="100%"
        direction="column"
        align="center"
        px="8px"
        py="1rem"
        borderRadius="15px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
      >
        <Image alt="Logo da RS" src={"/Image/RS-icon.svg"} />
      </Flex>
    </>
    // <Flex
    //   px="2rem"
    //   align={"center"}
    //   w={"100%"}
    //   justify={"space-between"}
    //   fontSize={wideVersion ? "16px" : "14px"}
    // >
    //   <Flex>
    //     <Image alt="Logo da RS" src={"/Image/RS-icon.svg"} w="40px" />
    //     <Text fontSize={"24px"} fontWeight="Bold">
    //       Sistema de Orçamento -
    //     </Text>
    //     <Text
    //       fontSize={"24px"}
    //       textColor={"#E30613"}
    //       fontWeight="Bold"
    //       ml="3px"
    //     >
    //       RS
    //     </Text>
    //   </Flex>
    //   {/* <Flex w="100%" align="start" ml="10rem">
    //       <Button
    //         mr="5rem"
    //         variant="ghost"
    //         _hover={{ bgColor: "#E30613", color: "white" }}
    //         fontWeight="Regular"
    //         onClick={() => {
    //           Router.push("/homepage");
    //         }}
    //         bgColor={asPath === "/homepage" ? "red" : ""}
    //         color={asPath === "/homepage" ? "white" : ""}
    //       >
    //         CONFERÊNCIA
    //       </Button>
    //       <Button
    //         variant="ghost"
    //         _hover={{ bgColor: "#E30613", color: "white" }}
    //         fontWeight="Regular"
    //         onClick={() => {
    //           Router.push("/pedidosFaturados");
    //         }}
    //         bgColor={asPath === "/pedidosFaturados" ? "red" : ""}
    //         color={asPath === "/pedidosFaturados" ? "white" : ""}
    //       >
    //         FATURADOS
    //       </Button>
    //     </Flex> */}
    //   <Button
    //     alignSelf="end"
    //     onClick={() => {
    //       destroyCookie(userToken as any, CLIENT_TOKEN);
    //       Router.push("./");
    //       // Router.reload();
    //     }}
    //     variant="ghost"
    //     _hover={{ bgColor: "#E30613", color: "white" }}
    //     fontWeight="Regular"
    //   >
    //     SAIR
    //   </Button>
    // </Flex>
  );
}
