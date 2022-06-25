import { Box, Button, Checkbox, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../components/FormField";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { HOME, SIGN_UP } from "../helper/Constant";
import { setLocalStorageToken, setLocalStorageUser } from "../helper/LocalStorageHelper";
import { useNavigator } from "../helper/NavigateHelper";
import { LOGIN_CREDENTIAL_DEFAULT_VALUE } from "../helper/StateDefaultValues";
import { loginThunk } from "../store/thunks/AuthThunk";

export const Login = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigator();
    const { user, token, isLoading } = useSelector((state) => state.auth);
    const [credential, setCredentials] = useState(LOGIN_CREDENTIAL_DEFAULT_VALUE);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      dispatch(loginThunk({ username: credential.username, password: credential.password }));
      setCredentials(LOGIN_CREDENTIAL_DEFAULT_VALUE);
    };

    const updateLocalStorage = (token, user, rememberMeFlag) => {
      if(rememberMeFlag && token && user && Object.keys(user).length) {
        setLocalStorageToken(token);
        setLocalStorageUser(user);
        setRememberMe(false);
      }
    }

    const onUserNameChange = (event) => setCredentials({...credential, username: event.target.value});
    const onPasswordChange = (event) => setCredentials({...credential, password: event.target.value});
    const toggleRememberMe = () => setRememberMe(!rememberMe);

    useEffect(() => {
      updateLocalStorage(token, user, rememberMe);
      token && navigateTo(HOME);
    });
    
    return (
      <>
        <Navbar/>
        <Flex width="full" align="center" justifyContent="center" mt="3.5rem">
          <Box p={8} pb={4} maxWidth="20rem" borderWidth={1} borderRadius={8} boxShadow="lg" mt={4}>
            <Box textAlign="center">
              <Heading fontSize={24}>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormField data={{label: "User Name", placeholder:"Enter User Name", type: "text", action: onUserNameChange, value: credential.username }}></FormField>
                <FormField data={{label: "Password", placeholder:"*******", type: "password", action: onPasswordChange, value: credential.password }}></FormField>
                <Checkbox colorScheme="cyan" onChange={toggleRememberMe} checked={rememberMe}>
                  Remember Me
                </Checkbox>
                <Button type="submit" colorScheme="cyan" width="full" mt={4} variant="solid" borderRadius={0}>
                    Sign In
                </Button>
                <Button variant="outline" colorScheme="cyan" width="full" mt={4} borderRadius={0} onClick={() => navigateTo(SIGN_UP)}>
                    Create New Account
                </Button>
              </form>
          </Box>
        </Box>
      </Flex>
      {isLoading && <Loader/>}
    </>  
  );
}
