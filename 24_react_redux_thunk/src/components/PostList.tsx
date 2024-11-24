import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { createPostAsync, fetchCommentsAsync, fetchPostsAsync } from "../features/posts/postsSlice";

const PostList = () => {
    const dispatch = useAppDispatch();
    const { items: posts, comments, loading, error } = useAppSelector(state => state.posts)

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, [dispatch])

    const handleCreatePost = () => {
        dispatch(createPostAsync({
            title: "New Post",
            body: "This is a new post created by the PostList component",
            userId: 1, // Replace with actual user ID
        }))
    }

    const handleLoadComments = (postId: number) => {
        if (!comments[postId]) {
            dispatch(fetchCommentsAsync(postId));
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={handleCreatePost}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Create New Post
            </button>

            <div className="space-y-4">
                {posts.map((post: any) => (
                    <div key={post.id} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="mt-2 text-gray-600">{post.body}</p>

                        <button onClick={() => handleLoadComments(post.id)} className="mt-2 text-blue-500 hover:text-blue-700">
                            {comments[post.id] ? 'Hide Comments' : 'Show Comments'}
                        </button>

                        {
                            comments[post.id] && (
                                <div className="mt-4 space-y-2">
                                    <h3 className="font-semibold">Comments:</h3>
                                    {comments[post.id].map((comment: any) => (
                                        <div key={comment.id} className="p-2 bg-gray-50 rounded">
                                            <p className="font-medium">{comment.email}</p>
                                            <p className="text-sm">{comment.body}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostList