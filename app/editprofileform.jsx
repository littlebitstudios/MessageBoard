"use client";

import { useState, useEffect } from 'react';

export default function EditProfileForm({profileId}) {
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!profileId) {
            return;
        }
        fetch(`/api/profiles/${profileId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfilePicUrl(data.profilePicture);
                setDisplayName(data.displayname);
                setUsername(data.username);
            });
    }, [profileId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/profiles/${profileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicture: profilePicUrl,
                displayname: displayName,
                username: username,
            }),
        });
        alert('Changes saved! Returning to the main page.');
        window.location.href = '/';
    };

    function clearForm(){
        setProfilePicUrl('');
        setDisplayName('');
        setUsername('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                size="40"
                type="text"
                placeholder="Profile Picture URL"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
            /><br />
            <input
                size="40"
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            /><br />
            <input
                size="40"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <button type="submit">Save</button>
            <button type="button" onClick={clearForm}>Clear Form</button>
            <a href="/profile" className='button'>Cancel</a>
        </form>
    );
}