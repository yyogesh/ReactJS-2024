import { useContext } from "react"
import { ErrorContext } from "../contexts/ErrorContext"

export const useError = () => {
    const context = useContext(ErrorContext);
    if(context === undefined) {
        throw new Error('useError must be used within an ErrorProvider')
    }
    return context
}