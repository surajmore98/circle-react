import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Flex } from "@chakra-ui/react";

export const Explore = () => {
    const { posts } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);

    
    const [ filter, setFilter] = useState("");
    const [postList, setPostList] = useState(posts || []);

    useEffect(() => {
        sortPosts(filter);
    }, [posts, filter]);

    const updateFilterValue = (val) => setFilter(val);

    const sortPosts = (filter) => {
        switch(filter) {
            case "trending":
                setPostList([...posts].sort((x, y) => y.likes.likeCount - x.likes.likeCount));
                break;
            case "latest":
                setPostList([...posts].sort((x, y) => y.createdAt - x.createdAt));
                break;
            case "forme":
                setPostList(posts.filter(x => x.username === user.username || user.following.includes(x.username)));
                break;
            default:
                break;
        }
    }

    return(
        <Flex flexDirection="column" flexGrow={1} alignItems="center" gap={4}>
            <Flex justifyContent="space-evenly" width="full">
                <Button colorScheme='cyan' variant='ghost' onClick={() => updateFilterValue("latest")}>Latest</Button>
                <Button colorScheme='cyan' variant='ghost' onClick={() => updateFilterValue("trending")}>Trending</Button>
                <Button colorScheme='cyan' variant='ghost' onClick={() => updateFilterValue("forme")}>For Me</Button>
            </Flex>
            {
                postList && postList.map((item, index) => <Post key={index} data={item} />)
            }
        </Flex>
    );
}