"use client";

import { useState, useEffect } from 'react';

export default function NewPostForm() {
    const [profileId, setProfileId] = useState('');
    const [profile, setProfile] = useState({});
    const [content, setContent] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const profileId = localStorage.getItem('defaultProfileId');
            setProfileId(profileId);

            fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
                setProfile(data);
            });
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
        <form onSubmit={handleSubmit}>
            <p>
                Posting as {profile.displayname} (@{profile.username})<br/>
                Go to the <a href="/profile">Profile Manager</a> to switch profiles
            </p>
            <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                cols="70"
            /><br />
            <button type="submit">Post</button>
            <button type="button" onClick={clearForm}>Clear Form</button>
            <a href="/" className='button'>Cancel</a>
        </form>
    );
}