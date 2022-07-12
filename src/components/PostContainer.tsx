import React, { useEffect, useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer: React.FC = () => {
    const [limit, setLimit] = useState(100);

    const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit);
    const [ createPost ] = postAPI.useCreatePostMutation();
    const [ updatePost ] = postAPI.useUpdatePostMutation();
    const [ deletePost ] = postAPI.useDeletePostMutation();
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLimit(3)
    //     }, 2000);
    // }, []);

    const handleCreate = async () => {
        const title = prompt();
        await createPost({ title, body: title } as IPost);
    };

    const handleRemove = (post: IPost) => {
        deletePost(post);
    };

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    };

    return (
        <div>
            <button onClick={() => refetch()}>REFETCH</button>
            <button onClick={handleCreate}>Add new post</button>
            <div className="post__list" style={{ margin: 5}}>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {posts?.map((post) => 
                    <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />
                )}
            </div>
        </div>
    )
}

export default PostContainer;