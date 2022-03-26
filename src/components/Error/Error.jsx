import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export const Error = ({ error }) => {

    useEffect(() => {
        toast.error(error)
    }, [])

    return (
        <div className="error">
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
            />
        </div>
    )
}