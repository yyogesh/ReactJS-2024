import { Link, useParams } from 'react-router-dom'

const UserProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="mb-4">User ID: {id}</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Home</Link>
        </>
    )
}

export default UserProfilePage