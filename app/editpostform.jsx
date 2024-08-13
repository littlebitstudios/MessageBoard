"use client";

import { useState, useEffect } from 'react';

export default function EditPostForm({postId}) {
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!postId) {
            return;
        }
        fetch(`/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                setContent(data.content);
                setProfilePicUrl(data.profilePicture);
                setDisplayName(data.displayname);
                setUsername(data.username);
            });
    }, [postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicture: profilePicUrl,
                displayname: displayName,
                username: username,
                content: content,
            }),
        });
        alert('Post submitted! Returning to the main page.');
        window.location.href = '/';
    };

    function setDefaultProfile(){
        const profile = {profilePicUrl: profilePicUrl, displayName: displayName, username: username};
        localStorage.setItem('defaultProfile', JSON.stringify(profile));
        alert("Profile saved. The profile boxes will autofill when you view this page again.")
    }

    function clearForm(){
        setProfilePicUrl('');
        setDisplayName('');
        setUsername('');
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Profile Picture URL"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
            />
            <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
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