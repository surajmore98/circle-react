import { useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Flex, Box, Button, IconButton, Input, Textarea, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonIcon } from "./ButtonIcon";
import { EmojiInput } from "./EmojiInput";
import { addPostThunk } from "../store/thunks/PostThunk";
import { useCustomColor } from "../helper/CustomColor";

export const CreatePost = () => {
    const { token } = useSelector((state) => state.auth);
    const imageUploader = useRef(null);
    const { bgColor, themeColor } = useCustomColor();
    const dispatch = useDispatch();

    const [content, setContent] = useState({ text: "", image: null });
    
    const clickHandler = () => {
        imageUploader.current.click();
    }

    const emojiInputHandler = (value) => {
        setContent({...content, text: content.text + value });
    };

    const ContentChangeHandler = (event) => setContent({...content, text: event.target.value}); 

    const clearContent = () => {
        setContent({text: "", image: null});
    }
 
    const onImageSelect = (event) => {
        setContent({...content, image: event.target.files.length > 0 ? event.target.files[0] : { }});
    };

    const removeSelectedImage = (event) => {
        event.preventDefault();
        setContent({...content, image: null});
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const request = {
            content: content.text,
            image: content.image,
            token: token
        }
        dispatch(addPostThunk(request));
        clearContent();
    }

    return (
        <Flex p={4} background={bgColor} width={{ base: "19rem", md: "22rem"}}>
            <Flex flexDirection="column" justifyItems="center" width="full">
                <Textarea placeholder="Write something intersting..." borderRadius={0} background="white" resize="none" color="black" value={content.text} onChange={ContentChangeHandler} width="auto"></Textarea>

                { content.image !== null &&
                    <Box position="relative" width="auto" mt={2}>
                        <Image src={URL.createObjectURL(content.image)} boxSize="full" objectFit="cover"/>
                        <Box pos="absolute" top={0} right={0}>
                            <ButtonIcon data={{label:"remove", color:themeColor, icon: <MdClose />, fontSize:"1rem", clickAction: removeSelectedImage}} />
                        </Box>
                    </Box> 
                }

                <Flex justifyContent="space-between" py={2} px={0}>
                    <Flex gap="0.25rem">
                        <IconButton aria-label="image" color={themeColor} bg="transparent" icon={<FiImage />} fontSize="1.5rem" onClick={clickHandler} borderRadius="full"/>
                        <EmojiInput action={emojiInputHandler} borderRadius="full"/>
                    </Flex>
                    <Flex gap="0.25rem">
                        { content && <Button color={themeColor} p="0.5rem 1.75rem" borderRadius={0} variant="outline" onClick={clearContent}>Clear</Button>}
                        <Button colorScheme={themeColor} p="0.5rem 1.75rem" borderRadius={0}  ml="auto" onClick={submitHandler}>Post</Button>
                    </Flex>   
                </Flex>
            </Flex>
            <Input type="file" display="none" ref={imageUploader} accept="image/*" onChange={onImageSelect}></Input>
        </Flex>
    );
}