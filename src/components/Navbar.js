import React from "react";
import { useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { Box, IconButton, Flex, Popover, PopoverTrigger
,PopoverContent, PopoverBody, Avatar, Link, Heading } from "@chakra-ui/react";
import { SearchUsers } from "./SearchUsers";
import { Link as ReachLink } from "react-router-dom";
import { useNavigator } from "../helper/NavigateHelper";
import { HOME } from "../helper/Constant";
import { useCustomColor } from "../helper/CustomColor";

export const Navbar = () => {
    const { isDark, toggleColorMode } = useCustomColor();
    const auth = useSelector((state) => state.auth);
    const navigateTo = useNavigator();
    
    return (
        <Flex p={1} width="full" justifyContent="space-between" alignItems="center"
         mb={4} borderBottomWidth={1} background={ isDark ? "black" : "white" } fontSize={24}
         height="3.5rem" position="fixed" top={0} zIndex="sticky" gap={4}>
            <Heading cursor="pointer" onClick={() => navigateTo(HOME)} color="cyan">Circle</Heading>
            <Flex justifyContent="flex-end" alignItems="center">
                <IconButton
                    aria-label={ isDark ? "light" : "dark" }
                    bg="transparent"
                    fontSize={20}
                    icon={ isDark ? <FaSun /> : <FaMoon /> }
                    onClick={toggleColorMode}
                    borderRadius="full"
                />
                {   auth.token &&
                    <>
                        <SearchUsers/>
                        <Popover>
                            <PopoverTrigger>
                                <IconButton variant="ghost" borderRadius="full" p={0}>
                                    <Avatar
                                    name={auth.user ? auth.user.username : ""}  
                                    size="sm"
                                    borderRadius="full"/>
                                </IconButton>
                            </PopoverTrigger>
                            <PopoverContent borderRadius={0} width="sm">
                                <PopoverBody>
                                    <Link as={ReachLink} to={`/profile/${auth.user._id}`} width="full"
                                        my={1} p={2} display="flex" alignItems="end"
                                        justifyContent="start" _hover={{
                                            background: "gray.100",
                                            color: "cyan.500",
                                        }}>
                                        <Box pl={1} fontSize={16}>My Account</Box>
                                    </Link>
                                    <Link as={ReachLink} to="/logout" width="full"
                                        my={1} p={2} display="flex" alignItems="end"
                                        justifyContent="start" _hover={{
                                            background: "gray.100",
                                            color: "cyan.500",
                                        }}>
                                        <Box pl={1} fontSize={16}>Logout</Box>
                                    </Link>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </>
                }               
            </Flex>
        </Flex>
    );
}