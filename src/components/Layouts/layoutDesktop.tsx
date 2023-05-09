import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import HeaderDesk from "../header/HeaderDesk";

export default function LayoutDesk(props: any) {
  return (
    <>
      <Flex bgColor="#EBEBEB" h="100vh" p="1rem">
        {/* <HeaderDesk /> */}

        {/* <Header /> */}

        {props.children}
        {/* <NavBar /> */}
      </Flex>
    </>
  );
}
