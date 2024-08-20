"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import '/styles/main.css';

export default function Page() {
    const params = useRouter();
    const [profileId, setProfileId] = useState('');
    const [profile, setProfile] = useState({});
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (params.query.id) {
            setProfileId(params.query.id);
        }
    }, [params.query.id]);

    useEffect(() => {
        if (profileId) {
            fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
                setProfile(data);
            });
        }
    }, [profileId]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    return (
        <>
            <h1>Profile QR Code</h1>
            <p>
                QR code for {profile.displayname} (@{profile.username})<br/>
                Scan this QR code with a phone to import this profile.
            </p>
            {origin && <QRCode value={`${origin}/profile/import/${profileId}`} />}
            <p>
                <a className="button" href="/profile">Return to Profile Manager</a>
            </p>
        </>
    );
}