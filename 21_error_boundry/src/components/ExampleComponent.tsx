import { useError } from "../hooks/useError"

const ExampleComponent = () => {
    const { setError } = useError();

    const handleClick = () => {
        throw new Error('This is an error')
        // try {
        //     throw new Error('This is an error')
        // } catch (error) {
        //     setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        // }
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
        >
            Trigger Error
        </button>
    )
}

export default ExampleComponent