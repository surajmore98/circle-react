import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const FormField= ({data}) => {
    const { label, placeholder, type, action, value } = data;
    
    return(
        <FormControl isRequired mb={2}>
            <FormLabel>{label}</FormLabel>
            <Input
             type={type}
             placeholder={placeholder} 
             onChange={action} 
             height={8} 
             borderRadius={0}
             value={value}/>
        </FormControl>
    );
}