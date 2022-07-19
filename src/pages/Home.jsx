import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";

export const Home = () => {
    const { posts } = useSelector((state) => state.post);
    const postList = posts && posts.length ? [...posts].sort((x,y) => new Date(y.createdAt) - new Date(x.createdAt)) : [];
    
    return (
        <Flex flexDirection="column" flexGrow={1} alignItems="center">
            <CreatePost/>
            <Heading fontSize={24} color="cyan.600" my={4}>Latest Posts</Heading>
            {
                postList && postList.sort((x,y) => y.createdAt - x.createdAt).map((item, index) => <Post key={index} data={item} />)
            }
        </Flex>
    ); 
}