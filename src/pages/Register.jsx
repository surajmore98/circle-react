import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../components/FormField";
import { Navbar } from "../components/Navbar";
import { HOME, LOG_IN } from "../helper/Constant";
import { useNavigator } from "../helper/NavigateHelper";
import { REGISTER_CREDENTIAL_DEFAULT_VALUE } from "../helper/StateDefaultValues";
import { registerThunk } from "../store/thunks/AuthThunk";

export const Register = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigator();
    const { token } = useSelector((state) => state.auth);
    const [credential, setCredentials] = useState(REGISTER_CREDENTIAL_DEFAULT_VALUE);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = {
          username: credential.username,
          password: credential.password,
          firstName: credential.firstName,
          lastName: credential.lastName
        }
        dispatch(registerThunk(request));
        setCredentials(REGISTER_CREDENTIAL_DEFAULT_VALUE);
    };

    token && navigateTo(HOME);

    const onUserNameChange = (event) => setCredentials({...credential, username: event.target.value});
    const onFirstNameChange = (event) => setCredentials({...credential, firstName: event.target.value});
    const onLastNameChange = (event) => setCredentials({...credential, lastName: event.target.value});
    const onPasswordChange = (event) => setCredentials({...credential, password: event.target.value});

    return (
      <>
        <Navbar/>
        <Flex width="full" align="center" justifyContent="center" mt="3.5rem">
          <Box p={4} maxWidth="20rem" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
              <Heading>Register</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormField data={{label: "User Name", placeholder:"Enter User Name", type: "text", action: onUserNameChange, value: credential.username}}></FormField>
                <FormField data={{label: "First Name", placeholder:"Enter First Name", type: "text", action: onFirstNameChange, value: credential.firstName}}></FormField>
                <FormField data={{label: "Last Name", placeholder:"Enter Last Name", type: "text", action: onLastNameChange, value: credential.lastName}}></FormField>
                <FormField data={{label: "Password", placeholder:"*******", type: "password", action: onPasswordChange, value: credential.password}}></FormField>
                <Button type="submit" colorScheme="cyan" width="full" mt={4} borderRadius={0}>
                    Sign Up 
                </Button>
                <Button colorScheme="cyan" width="full" mt={4} variant="outline"
                  borderRadius={0} onClick={() => navigateTo(LOG_IN)}>
                    Already Have An Account
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
    </>
  );
}