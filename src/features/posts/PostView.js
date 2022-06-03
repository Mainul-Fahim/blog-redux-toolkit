import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice';

const PostView = () => {
   
    const postsE = useSelector((state)=>console.log(state));
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts;
        content = orderedPosts.map((post,index )=> <Post key={index} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};

export default PostView;