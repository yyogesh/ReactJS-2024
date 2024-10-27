import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

type DropdownRenderProps = {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

type DropdownProps = {
    children: (props: DropdownRenderProps) => React.ReactNode
}

// compound component pattern

const Dropdown = ({ children }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);
    return children({ isOpen, toggle, close });
}

export default Dropdown

Dropdown.Trigger = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="inline-flex items-center gap-2 cursor-pointer">
            {children}
            <ChevronDown className="w-4 h-4" />
        </div>
    )
}

Dropdown.Menu = ({ children }: { children: React.ReactNode }) => {
    return createPortal(
        <div className="fixed bg-white shadow-lg rounded-md py-2 min-w-[200px]">
            {children}
        </div>,
        document.body
    )
}
Dropdown.Item = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return (
        <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            onClick={onClick}
        >
            {children}
        </div>
    )
}