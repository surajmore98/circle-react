import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { Toast } from "./components/Toast";
import { getLocalStorageToken, getLocalStorageUser } from "./helper/LocalStorageHelper";
import { Bookmark } from "./pages/Bookmark";
import { Explore } from "./pages/Explore";
import{ Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { updateToken, updateUser } from "./store/AuthSlice";
import { LayoutWrapper } from "./wrappers/LayoutWrapper";
import { RequireAuth } from "./wrappers/RequireAuth";
import { NotFound } from "./pages/NotFound";
import { Like } from "./pages/Like";
import { AuthWrapper } from "./wrappers/AuthWrapper";
import { ScrollTop } from "./components/ScrollTop";

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
        <Route 
          path="/login" 
          element={
            <AuthWrapper>
              <Login/>
            </AuthWrapper>
          }
        />
        <Route 
          path="/register" 
          element={
            <AuthWrapper>
              <Register/>
            </AuthWrapper>
          }
        />
        <Route 
          path="/logout" 
          element={
            <AuthWrapper>
              <Logout/>
            </AuthWrapper>
          }
        />
        <Route 
          path="/profile/:id"
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Profile/>
              </LayoutWrapper>
            </RequireAuth> 
          }
        />
        <Route 
          path="/"
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Home/>
              </LayoutWrapper>
            </RequireAuth> 
          }
        />
        <Route 
          path="/explore"
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Explore/>
              </LayoutWrapper>
            </RequireAuth> 
          }
        />
        <Route 
          path="/bookmark"
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Bookmark/>
              </LayoutWrapper>
            </RequireAuth> 
          }
        />
        <Route 
          path="/like"
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Like/>
              </LayoutWrapper>
            </RequireAuth> 
          }
        />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <ScrollTop/>
      <Toast/>
    </>   
  );
}

export default App;