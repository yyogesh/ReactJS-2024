import { useError } from "../hooks/useError";

const ErrorDisplay = () => {
    const { error, setError } = useError();

    if (!error) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">An error occurred</h2>
                <p className="text-gray-700 mb-4">{error.message}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setError(null)}
                >
                    Dismiss
                </button>
            </div>
        </div>
    )
}

export default ErrorDisplay