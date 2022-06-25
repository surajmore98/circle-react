import { ToastContainer } from 'react-toastify';

export const Toast = () => {
    return (
     <ToastContainer
        position="bottom-center"
        autoClose={300}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover />
    );
}