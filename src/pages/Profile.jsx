import { Flex, Button, Avatar, Text, Heading, Tooltip } from "@chakra-ui/react";
import { EditProfile } from "../components/EditProfile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { followThunk, unfollowThunk } from "../store/thunks/UserThunk";
import { useCustomColor } from "../helper/CustomColor";
import { NoPosts } from "../components/NoPosts";

export const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { users, posts } = useSelector((state) => state.post);
    const { themeColor } = useCustomColor();

    const isLoggedUser = id  === user._id;
    const profileData = !isLoggedUser ? users.find(x => x._id === id) : user;
    const isFollowing = profileData?.followers?.map(x => x._id).includes(user._id);
    const myPosts = posts.filter(x => x.username === profileData?.username);
    const followingToolTip = profileData?.following.length > 0 ? profileData.following.map(x => `${x.firstName} ${x.lastName}`).join(", ") : "";
    const followerToolTip = profileData?.followers.length > 0 ? profileData.followers.map(x => `${x.firstName} ${x.lastName}`).join(", ") : "";

    const toggleFollow = (toggleFlag) => {
        const request = {
            userId: id,
            token: token
        }
        dispatch(toggleFlag ? followThunk(request) : unfollowThunk(request));
    }

    return(
        !profileData ? <Heading>No User Found</Heading>
        : <Flex flexDirection="column" width="full">
            <Flex justifyContent="center" alignItems="center" flexDirection="column" gap="0.25rem">
                <Avatar name={profileData.username} src={profileData.profileImage} size="xl"/>
                <Text fontSize="1.25rem" fontWeight="bold">{profileData.firstName}{" "}{profileData.lastName}</Text>
                <Text fontSize="1rem" color="gray.400">@{profileData.username}</Text>
                {
                    isLoggedUser ? <EditProfile/> :
                    <Button fontSize="0.75rem" height="2rem" borderRadius={0} m={1}
                    colorScheme={themeColor} variant="outline" onClick={() => toggleFollow(!isFollowing)}
                    >{isFollowing ? "Unfollow" : "Follow" }</Button>           
                }                
                <Text textAlign="center">{profileData.bio}</Text>
            </Flex>
            <Flex justifyContent="space-evenly" alignItems="center" mt="1rem">
                <Tooltip label={followingToolTip} placement="bottom">
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" fontSize={16} cursor="pointer">
                        <Text fontWeight="bold">{profileData.following.length}</Text>
                        <Text fontWeight="bold">Following</Text>
                    </Flex>
                </Tooltip>
                <Flex flexDirection="column" justifyContent="center" alignItems="center" fontSize={16}>
                    <Text fontWeight="bold">{myPosts.length}</Text>
                    <Text fontWeight="bold">Posts</Text>
                </Flex>
                <Tooltip label={followerToolTip} placement="bottom">
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" fontSize={16} cursor="pointer">
                        <Text fontWeight="bold">{profileData.followers.length}</Text>
                        <Text fontWeight="bold">Followers</Text>
                    </Flex>
                </Tooltip>
            </Flex>
            <Flex flexDirection="column" flexGrow={1} alignItems="center">
                <Heading fontSize="1.5rem" color={themeColor} textAlign="center" py={4}>Posts</Heading>
                {
                    myPosts && myPosts.length ? myPosts.sort((x,y) => new Date(y.createdAt) - new Date(x.createdAt)).map((item, index) => <Post key={index} data={item} />)
                    : <NoPosts/>
                }
            </Flex>
        </Flex>    
    );
}