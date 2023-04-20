import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function LayoutDesk(props: any) {
  return (
    <>
      <Flex px="2rem" mt="0.3rem" direction="column">
        {/* <Header /> */}
        {props.children}
        {/* <NavBar /> */}
      </Flex>
    </>
  );
}
