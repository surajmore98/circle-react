import { Flex, Avatar, Text } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";    
import { StatusCode } from "../helper/StatusCode";
import { ButtonIcon } from "../components/ButtonIcon";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { downvotePostComment, removePostComment, upvotePostComment } from "../services/CommentService";
import { toast } from "react-toastify";
import { useCustomColor } from "../helper/CustomColor";

export const Comment = ({ data, postId, action }) => {
    const { username, text, votes, _id} = data;
    const { token, user } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.post);
    const { bgColor } = useCustomColor();
    
    const likeCount = votes?.upvotedBy?.length;
    const isLiked = likeCount && votes.upvotedBy.find(x => x._id === user._id);
    const commentUser = users.find(x => x.username === username); 

    const togglelike = async () => {
        try
        {
            let response;
            if(isLiked) {
                response = await downvotePostComment({id: _id, postId, token});
            } else {
                response = await upvotePostComment({id: _id, postId, token});
            }
            
            if(response.status === StatusCode.CREATED) {
                const comments = response?.data?.comments;
                if(comments) {
                    action((data) => ({ ...data, comments: comments}));
                }
            }
        }
        catch(e) {
            toast.error("Error while liking the Comment.");
        }
    }

    const deleteComment = async () => {
        try
        {
            const response = await removePostComment({id: _id, postId, token});
            
            if(response.status === StatusCode.CREATED) {
                action((data) => ({ ...data, comments: response.data.comments}));
            }
        }
        catch(e) {
            toast.error("Error while deleting the Comment.");
        }
    }

    return (
        <Flex px={1} py={2} background={bgColor} gap="0.5rem">
            <Flex alignItems="start"><Avatar name={username} src={commentUser ? commentUser.profileImage: ""} size='sm'/></Flex>
            <Flex flexDirection="column" gap="0.25rem" flexGrow={1}>
                {
                    username === user.username ?
                    <Flex gap="0.25rem" alignItems="center">
                        <Text fontSize="0.75rem" fontWeight="bold">You</Text>
                    </Flex> 
                    :
                    <Flex gap="0.25rem" alignItems="center">
                        <Text fontSize="0.75rem" fontWeight="bold">{commentUser ? `${commentUser.firstName} ${commentUser.lastName}`: "" }</Text>
                        <Text fontSize="0.75rem" color="gray.400">@{username}</Text>
                    </Flex>
                }
                <Flex fontSize="0.675rem">
                    {text}
                </Flex>
            </Flex>
            <Flex alignItems="start">
                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                <ButtonIcon data={{label:"like", icon: isLiked ? <FaHeart/> : <FiHeart/>, color: isLiked ? "red.400" : "gray.400", fontSize:"0.75rem", clickAction: togglelike }}/>
                    {likeCount > 0 && <Text color="gray.400" fontSize={12}>{likeCount}</Text>}
                </Flex>
                { username === user.username  && <ButtonIcon data={{label:"delete", icon: <FaTrash/>, color: "gray.400", fontSize:"0.75rem", clickAction: deleteComment }}/> }
            </Flex>
            
        </Flex>
    );
}