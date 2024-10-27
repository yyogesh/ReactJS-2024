import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}
const Modal = ({
    isOpen,
    onClose,
    children
}: ModalProps) => {
    if(!isOpen) return null
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal