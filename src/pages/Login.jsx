import { Container, VStack, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SupabaseAuthUI, useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Login Page</Text>
        {!session ? (
          showLogin ? (
            <SupabaseAuthUI />
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )
        ) : (
          <Button onClick={() => { setShowLogin(false); logout(); }}>Logout {session.user.email}</Button>
        )}
      </VStack>
    </Container>
  );
};

export default Login;