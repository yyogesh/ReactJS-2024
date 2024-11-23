import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux-hooks"
import { fetchPostsAsync } from "../features/posts/postsSlice";

const PostList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, [dispatch])
    const handleCreatePost = () => { 

    }
    return (
        <div className="container mx-auto p-4">
            <button
                onClick={handleCreatePost}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Create New Post
            </button>
        </div>
    )
}

export default PostList