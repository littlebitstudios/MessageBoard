"use client";

import { useState, useEffect, useRef } from 'react';

export default function ProfileContainer({ id }) {
    const [activeProfile, setActiveProfile] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const profileId = id;
            if (profileId) {
                fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
                    setActiveProfile(data);
                });
            }
        }
    }, [id]);

    return (
        <>
            <div className="profile-container">
                <img width="48" height="48" src={activeProfile.profilePicture || 'https://img.icons8.com/fluency/48/person-male.png'} />
                <div className="text-container">
                    <strong>{activeProfile.displayname}</strong>
                    <br />@{activeProfile.username}
                </div>
            </div>
        </>
    )
}