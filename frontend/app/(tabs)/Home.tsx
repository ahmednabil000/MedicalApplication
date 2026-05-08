import styled from "styled-components/native";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { Colors } from "@/constants/theme";

const Container = styled(View)`
  flex: 1;
  background-color: ${Colors.gray10};
`;

export default function HomeScreen() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!isUserLoggedIn) {
  //     router.replace("/auth");
  //   }
  // }, [isUserLoggedIn]);

  return (
    <>
      <Container>
        
        <Link
          href="/auth"
          style={{
            color: "red",
            margin: 50,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Go to auth
        </Link>
      </Container>
    </>
  );
}
