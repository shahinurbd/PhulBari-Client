import { useContext } from "react";
import AuthContext from "../components/Context/AuthContext";

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;