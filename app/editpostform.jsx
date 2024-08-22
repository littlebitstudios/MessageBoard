"use client";

import { useState, useEffect } from 'react';

export default function EditPostForm({postId}) {
    const [profileId, setProfileId] = useState('');
    const [profile, setProfile] = useState({});
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!postId) {
            return;
        }
        fetch(`/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfileId(data.profileId);
                setContent(data.content);
            });
    }, [postId]);

    useEffect(() => {
        if (!profileId) {
            return;
        }
        fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
            setProfile(data);
        });

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            if (profileId !== localStorage.getItem('defaultProfileId')){
                alert('You cannot edit this post, you are not its author. If you are the author, go to the Profile Manager and choose the correct profile.');
                window.location.href = '/';
            }
        }
    }, [profileId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
            }),
        });
        alert('Post submitted! Returning to the main page.');
        window.location.href = '/';
    };

    function clearForm(){
        setProfilePicUrl('');
        setDisplayName('');
        setUsername('');
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems:"center" }}>
            <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                cols="50"
            />
            <div style={{ display: "flex", justifyContent: "center", alignItems:"center", marginTop:"10px"}}>
                <button type="submit"><strong>Save</strong></button>
                <button type="button" onClick={clearForm}>Clear Form</button>
                <a style={{marginLeft:"5px"}} href="/" className='button'>Cancel</a>
            </div>
        </form>
    );
}