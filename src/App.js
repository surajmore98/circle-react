import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { Toast } from "./components/Toast";
import { getLocalStorageToken, getLocalStorageUser } from "./helper/LocalStorageHelper";
import { Login, Logout, Register } from "./pages/Pages";
import { updateToken, updateUser } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const localToken = getLocalStorageToken();
    if(localToken) {
      dispatch(updateToken(localToken));
    }

    const localUser = getLocalStorageUser();
    if(localUser) {
      dispatch(updateUser(JSON.parse(localUser)));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
      <Toast/>
    </>   
  );
}

export default App;