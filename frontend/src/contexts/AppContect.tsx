// Importing necessary modules from React
import React, { useContext, useState } from "react";

// Importing the Toast component from "../components/Toast"
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

// Defining a type for the structure of a toast message
type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

// Defining a type for the AppContext
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedin: boolean;
};



// Creating a context for the AppContext, initially undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Exporting the AppContextProvider component
export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Using useState hook to manage toast state
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);


    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    

    // Rendering the context provider with the provided value
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedin: !isError
            }}>
            {/* Rendering the Toast component if toast exists */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {/* Rendering the children components */}
            {children}
        </AppContext.Provider>
    );
};

// Exporting a custom hook named useAppContext
export const useAppContext = () => {
    // Using useContext hook to access the AppContext
    const context = useContext(AppContext);
    return context as AppContext; // Casting the context to AppContext type
};
