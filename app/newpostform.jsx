"use client";

import { useState, useEffect } from 'react';

export default function NewPostForm() {
    const [profileId, setProfileId] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const profileId = localStorage.getItem('defaultProfileId');
            if (!profileId) {
                alert(`You need a profile to post! Opening the Profile Manager to choose an active profile.`);
                window.location.href = '/profile';
            }
            setProfileId(profileId);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profileId: profileId,
                content: content,
            }),
        });
        alert('Post submitted! Returning to the main page.');
        window.location.href = '/';
    };

    function clearForm() {
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
                <button type="submit">Post</button>
                <button type="button" onClick={clearForm}>Clear Form</button>
                <a style={{marginLeft:"5px"}} href="/" className='button'>Cancel</a>
            </div>
        </form>
    );
}