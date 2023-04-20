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
    <Flex direction="column">
      <Flex
        align={"center"}
        w={"100%"}
        justify={"space-between"}
        fontSize={wideVersion ? "16px" : "14px"}
      >
        <Flex>
          <Image alt="Logo da RS" src={"/Image/RS-icon.svg"} w="40px" />
          <Text fontSize={"32px"} fontWeight="Bold">
            SE
          </Text>
          <Text fontSize={"32px"} textColor={"#E30613"} fontWeight="Bold">
            RS
          </Text>
        </Flex>
        <Flex w="100%" align="start" ml="10rem">
          <Button
            mr="5rem"
            variant="ghost"
            _hover={{ bgColor: "#E30613", color: "white" }}
            fontWeight="Regular"
            onClick={() => {
              Router.push("/homepage");
            }}
            bgColor={asPath === "/homepage" ? "red" : ""}
            color={asPath === "/homepage" ? "white" : ""}
          >
            CONFERÊNCIA
          </Button>
          <Button
            variant="ghost"
            _hover={{ bgColor: "#E30613", color: "white" }}
            fontWeight="Regular"
            onClick={() => {
              Router.push("/pedidosFaturados");
            }}
            bgColor={asPath === "/pedidosFaturados" ? "red" : ""}
            color={asPath === "/pedidosFaturados" ? "white" : ""}
          >
            FATURADOS
          </Button>
        </Flex>
        {/* <Button
          alignSelf="end"
          onClick={() => {
            destroyCookie(userToken as any, CLIENT_TOKEN);
            Router.push("./");
            // Router.reload();
          }}
          variant="ghost"
          _hover={{ bgColor: "#E30613", color: "white" }}
          fontWeight="Regular"
        >
          SAIR
        </Button> */}
      </Flex>
      <Box borderBottomWidth="2px" mt="1rem" w="100%" borderColor="gray.200" />
    </Flex>
  );
}
