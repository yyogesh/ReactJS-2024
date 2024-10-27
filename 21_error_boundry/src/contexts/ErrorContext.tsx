import { createContext, useState } from "react";

interface ErrorContextType {
    error: Error | null
    setError: React.Dispatch<React.SetStateAction<Error | null>>
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {

    const [error, setError] = useState<Error | null>(null)

    return <ErrorContext.Provider value={{ error, setError }}>
        {children}
    </ErrorContext.Provider>
}