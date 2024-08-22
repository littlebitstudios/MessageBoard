"use client";

import { useState } from 'react';

export default function NewProfileForm({ profileId }) {
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/profiles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicture: profilePicUrl,
                displayname: displayName,
                username: username,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Save ID to localStorage
                const profileIds = JSON.parse(localStorage.getItem('profileIds')) || [];
                profileIds.push(data.id);
                localStorage.setItem('profileIds', JSON.stringify(profileIds));

                // Confirm action with user and return to profile manager
                alert(`Profile created! Its Profile ID is ${data.id}. Keep the Profile ID safe as you need it to use the profile on another device. Returning to the profile manager.`);
                if (profileIds.length === 1) {
                    localStorage.setItem('defaultProfileId', data.id);
                    alert("One more thing before we go back to the Profile Manager. Since this is your first profile, we automatically set it as your active profile.");
                }
                window.location.href = '/profile';
            })
            .catch(error => {
                console.error('Error creating profile:', error);
            });
    };

    function clearForm() {
        setProfilePicUrl('');
        setDisplayName('');
        setUsername('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems:"center" }}>
            <input
                type="text"
                placeholder="Profile Picture URL"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                style={{ width: "300px", margin: "5px 0", padding: "10px" }}
            /><br />
            <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{ width: "300px", margin: "5px 0", padding: "10px" }}
                required
            /><br />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "300px", margin: "5px 0", padding: "10px" }}
                required
            />
            <div style={{ display: "flex", justifyContent: "center", alignItems:"center", marginTop:"10px"}}>
                <button type="submit">Create</button>
                <button type="button" onClick={clearForm}>Clear Form</button>
                <a style={{marginLeft:"5px"}} href="/profile" className='button'>Cancel</a>
            </div>
        </form>
    );
}