import { Flex, Text, Avatar, useColorMode, IconButton, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { followThunk, getUsersThunk } from "../store/thunks/UserThunk";

export const UserList = () => {
    const { colorMode } = useColorMode();
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.post);
    const bgColor = colorMode === "dark" ? "gray.500" : "gray.100";

    const followUsers = user ? 
        users.filter(x => x._id !== user._id &&
            !user.following.map(y => y._id).includes(x._id)) : users; 

    const follow = (id) => {
        const request = {
            userId: id,
            token: token
        }
        dispatch(followThunk(request));
    }

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [user]);

    return(
        <Box top="5rem" position="fixed" right={8} display={{base: "none", md: "block"}} width={{base: 0, md: "25%"}}>
            <Flex flexDirection="column" p={2} background={bgColor} maxHeight="20rem"
             overflowY="auto">
                <Text fontWeight="bold" fontSize="1rem" color="cyan"
                borderBottomWidth={1} py={2} px={1}>
                    Follow
                </Text>
                {
                    followUsers && followUsers.map((item, index) => {
                        return (
                            <Flex my={2} px={2} key={index} justifyContent="space-between" gap={4}>
                                <Avatar name={item.username} src={item.profileImage} size="md"/>
                                <Flex justifyContent="center" flexDirection="column" flexGrow={1}>
                                    <Text fontSize="0.75rem" fontWeight="bold">{`${item.firstName} ${item.lastName}`}</Text>
                                    <Text fontSize="0.75rem" color="gray.400">@{item.username}</Text>
                                </Flex>
                                <IconButton icon={<FiPlusCircle/>} onClick={() => follow(item._id)}></IconButton>
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Box>
    );
}