import { useState } from "react";
import { checkToken } from "../hooks/authHooks";
import NavigationBarAuth from "./NavigationBarAuth";
import NavigationBarNoAuth from "./NavigationBarNoAuth";

const NavigationBar = () => {
    const { isError: authError } = checkToken();
    
    const [isLoggedIn, setIsLoggedIn] = useState(!authError);
    return (
        <div>{isLoggedIn? <NavigationBarAuth/>: <NavigationBarNoAuth/>}</div>
    )

}
export default NavigationBar;