import Picker from "emoji-picker-react";
import { MdInsertEmoticon } from "react-icons/md";
import {  Popover, PopoverTrigger, PopoverContent, IconButton } from "@chakra-ui/react";

export const EmojiInput = ({ action, height, size, borderRadius }) => {
    
    const onEmojiSelect = (event, emojiObject) => {
        event.preventDefault();
        action(emojiObject.emoji);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton aria-label="emoji" color="cyan.400" bg="transparent" icon={<MdInsertEmoticon />} fontSize={size || "1.5rem"} borderRadius={borderRadius || 0} height={height || "full"}/>
            </PopoverTrigger>
            <PopoverContent background="transperant" border="none" maxWidth={70}>
                <Picker onEmojiClick={onEmojiSelect}/>
            </PopoverContent>
        </Popover>
    )
}