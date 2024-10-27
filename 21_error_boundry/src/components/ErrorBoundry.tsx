import { Component, ErrorInfo, ReactNode } from "react";


interface ErrorBoundryProps {
    children: ReactNode;
    fallback?: ReactNode
}

interface ErrorBoundryState {
    hasError: boolean
}

class ErrorBoundyClass extends Component<ErrorBoundryProps, ErrorBoundryState> {

    constructor(props: ErrorBoundryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundryState {
        // Update state so the next render will show the fallback UI.
        console.log('getDerivedStateFromError', error)
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Uncaught error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback || <>
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <h2 className="text-lg font-bold mb-2">Oops! Something went wrong.</h2>
                    <p>We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
                </div>
            </>
        }
        return this.props.children
    }
}

export const ErrorBoundry = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundyClass>
            {children}
        </ErrorBoundyClass>
    )
}