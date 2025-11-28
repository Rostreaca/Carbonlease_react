import { useState } from "react";

export default function useToast() {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState("success");

    const showToastMessage = (message, variant = "success") => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const closeToast = () => {
        setShowToast(false);
    };

    return {
        toastMessage,
        showToast,
        toastVariant,
        showToastMessage,
        closeToast
    };
}