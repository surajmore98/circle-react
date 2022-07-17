import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const FormField= ({data}) => {
    const { label, placeholder, type, action, value } = data;
    
    return(
        <FormControl isRequired my={1}>
            <FormLabel fontSize={12}>{label}</FormLabel>
            <Input
             type={type}
             placeholder={placeholder} 
             onChange={action} 
             height={8} 
             fontSize={12}
             borderRadius={0}
             value={value}/>
        </FormControl>
    );
}