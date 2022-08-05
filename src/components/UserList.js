import { Flex, Text, Avatar, IconButton, Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useCustomColor } from "../helper/CustomColor";
import { Link } from "react-router-dom";
import { followThunk, getUsersThunk, unfollowThunk } from "../store/thunks/UserThunk";

export const UserList = () => {
    const { bgColor } = useCustomColor();
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.post);

    const followings = user.following.map(y => y._id);
    const userList = users && users.length > 0 ? users.filter(x => x._id !== user._id).map((u) => {
        return followings.includes(u._id) ? {...u, following: true} : {...u, following: false}; 
    }) : users;

    const toggleFollow = (id, followingFlag) => {
        const request = {
            userId: id,
            token: token
        }
        dispatch(followingFlag ? unfollowThunk(request) : followThunk(request));
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
                    userList.length ? userList.map( item => {
                        return (
                            <Flex my={2} px={2} key={item._id} justifyContent="space-between" gap={4}
                                    _hover={{
                                    color: "cyan.500"
                                }}>
                                <Link to={`/profile/${item._id}`}>
                                    <Flex display="flex" gap={4} justifyContent="space-between">
                                        <Avatar name={item.username} src={item.profileImage} size="md"/>
                                        <Flex justifyContent="center" flexDirection="column" flexGrow={1}>
                                            <Text fontSize="0.75rem" fontWeight="bold">{`${item.firstName} ${item.lastName}`}</Text>
                                            <Text fontSize="0.75rem">@{item.username}</Text>
                                        </Flex>
                                    </Flex>
                                </Link>
                                <IconButton icon={item.following ? <FiMinusCircle/> : <FiPlusCircle/>} onClick={() => toggleFollow(item._id, item.following)} background={bgColor}></IconButton>
                            </Flex>
                        )
                    }) : <Heading size="sm" p={4}>No User To Follow...</Heading>
                }
            </Flex>
        </Box>
    );
}