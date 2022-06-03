import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <article>
            <h3>{post.blogName}</h3>
            <p>{post.content?.substring(0, 100)}</p>
            <Link to={`post/${post._id}`}>View Post</Link>
        </article>
    );
};

export default Post;