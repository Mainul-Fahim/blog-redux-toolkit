import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { fetchComments, getCommentsError, getCommentsStatus, selectAllComments } from './commentsSlice';
import { selectPostById } from './postsSlice';

const SingleBlogPost = () => {
    
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, postId))
    const commentsNew = useSelector((state)=>console.log(state));
    const dispatch = useDispatch();

    const comments = useSelector(selectAllComments);
    const commentStatus = useSelector(getCommentsStatus);
    const error = useSelector(getCommentsError);

    useEffect(() => {
        if (commentStatus === 'succeeded') {
            dispatch(fetchComments())
        }
    }, [commentStatus, dispatch])

    let content;
    // if (commentStatus === 'loading') {
    //     content = <p>"Loading..."</p>;
    // } else if (commentStatus === 'idle') {
        const orderedPosts = comments;
        content = orderedPosts.map((comment,index )=> <article>
        <h3>{comment.title}</h3>
        <p>{comment.body.substring(0, 100)}</p>
        <button onClick={(()=>console.log('clicked'))}>Reply</button>
    </article>)
    // } else if (commentStatus === 'failed') {
    //     content = <p>{error}</p>;
    // }
    
    // if (!post) {
    //     return (
    //         <section>
    //             <h2>Post not found!</h2>
    //         </section>
    //     )
    // }
    return (
        <article>
            <h2>{post.blogName}</h2>
            <p>{post.content}</p>
            <br />
            <Comment/>
            <br />
            <h2>Comments</h2>
            {content}
        </article>
    );
};

export default SingleBlogPost;