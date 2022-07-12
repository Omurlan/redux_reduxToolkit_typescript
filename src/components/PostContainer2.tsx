import React from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer2: React.FC = () => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(10);

    return (
        <div>
            <div className="post__list" style={{ margin: 5 }}>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {/* {posts?.map((post) => 
                    <PostItem key={post.id} post={post} />
                )} */}
            </div>
        </div>
    )
}

export default PostContainer2;