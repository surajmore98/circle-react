import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Post } from "../components/Post";

export const Like = () => {
    const { posts } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);
    
    const likedPosts = posts.filter(x => x.likes.likedBy.map(y => y._id).includes(user._id));

    return(
        <Flex flexDirection="column" flexGrow={1} alignItems="center">
            <Heading fontSize="1.5rem" color="cyan.600" my={4} >My Likes</Heading>
            {
                likedPosts && likedPosts.sort((x,y) => new Date(y.createdAt) - new Date(x.createdAt)).map((item, index) => <Post key={index} data={item} />)
            }
        </Flex>
    );
}