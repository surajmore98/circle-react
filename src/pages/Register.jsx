import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../components/FormField";
import { GUESTCREDENTIALS, HOME, LOG_IN } from "../helper/Constant";
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
        await dispatch(registerThunk(request));
        setCredentials(REGISTER_CREDENTIAL_DEFAULT_VALUE);
    };

    token && navigateTo(HOME);

    const setDummyCredential = () => {
      setCredentials({
        ...GUESTCREDENTIALS,
        username: Math.random().toString(24).replace(/[^a-z]+/g, '')
      });
    }

    const onUserNameChange = (event) => setCredentials({...credential, username: event.target.value});
    const onFirstNameChange = (event) => setCredentials({...credential, firstName: event.target.value});
    const onLastNameChange = (event) => setCredentials({...credential, lastName: event.target.value});
    const onPasswordChange = (event) => setCredentials({...credential, password: event.target.value});

    return (
      <Box px={8} py={4} maxWidth="20rem" borderWidth={1} boxShadow="lg">
        <Box textAlign="center">
          <Heading fontSize={24}>Register</Heading>
        </Box>
        <Box my={2} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormField data={{label: "User Name", placeholder:"Enter User Name", type: "text", action: onUserNameChange, value: credential.username}}></FormField>
            <FormField data={{label: "First Name", placeholder:"Enter First Name", type: "text", action: onFirstNameChange, value: credential.firstName}}></FormField>
            <FormField data={{label: "Last Name", placeholder:"Enter Last Name", type: "text", action: onLastNameChange, value: credential.lastName}}></FormField>
            <FormField data={{label: "Password", placeholder:"*******", type: "password", action: onPasswordChange, value: credential.password}}></FormField>
            <Button colorScheme="cyan" width="full" mt={2} variant="outline"
              borderRadius={0} fontSize={14} height={8}
              onClick={setDummyCredential}>
                Fill Form Data
            </Button>
            <Button type="submit" colorScheme="cyan" width="full" mt={2}
              borderRadius={0} fontSize={14} height={8}>
                Sign Up 
            </Button>
            <Button colorScheme="cyan" width="full" mt={2} variant="link"
              borderRadius={0} onClick={() => navigateTo(LOG_IN)} fontSize={14}
              height={8}>
                Already Have An Account?
            </Button>
          </form>
        </Box>
      </Box>
    );
}