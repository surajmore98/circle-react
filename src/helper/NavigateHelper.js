import { useNavigate } from "react-router-dom";
import { SIGN_UP, LOG_IN, LOG_OUT, HOME } from "./Constant";

export const useNavigator = () => {
    const navigate = useNavigate();
    
    const navigateTo = (value) => {
        switch(value) {
            case HOME:
                navigate("/");
                break;
            case SIGN_UP:
                navigate("/register");
                break;
            case LOG_IN:
                navigate("/login");
                break;
            case LOG_OUT:
                navigate("/logout");
                break;
            default:
                break;    
        }
    }
    return navigateTo;
}