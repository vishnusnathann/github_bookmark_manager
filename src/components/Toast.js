import React from 'react'
import {  toast } from 'react-toastify';

export const ToastSuccess = () => {

        toast.success("Repository added",{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })

}
export const ToastDanger = () => {
    
        toast.error("Repository removed",{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    
}

export const ToastMessage = (message) => {
    
    toast.warn(message,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })

}

