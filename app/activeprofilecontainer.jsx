"use client";

import { useState, useEffect, useRef } from 'react';

export default function ActiveProfileContainer() {
    const [activeProfile, setActiveProfile] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const profileId = localStorage.getItem('defaultProfileId');
            if (profileId) {
                fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
                    setActiveProfile(data);
                });
            } else {
                const anonProfile = {
                    displayname: 'No profile set',
                    username: 'anonymous',
                    profilePicture: 'https://img.icons8.com/fluency/48/person-male.png'
                };
                setActiveProfile(anonProfile);
            }
        }
    }, []);

    return (
        <>
            <a href="/profile" title="Currently active profile; click to open Profile Manager">
                <div className="active-profile-container">
                    <img width="48" height="48" src={activeProfile.profilePicture || 'https://img.icons8.com/fluency/48/person-male.png'} />
                    <div className="text-container">
                        <strong>{activeProfile.displayname}</strong>
                        <br />@{activeProfile.username}
                    </div>
                </div>
            </a>
        </>
    )
}