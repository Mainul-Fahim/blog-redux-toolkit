import React from 'react';
import { useState } from 'react';
import AddPostForm from '../features/posts/AddPostForm';
import PostView from '../features/posts/PostView';

const Home = () => {
    
    const [open,setOpen] = useState(false);
    
    return (
        <main>
            <br />
            <button onClick={() => setOpen(true)}>Add Post</button>
            {open && <AddPostForm/>}
            <PostView/>
        </main>
    );
};

export default Home;