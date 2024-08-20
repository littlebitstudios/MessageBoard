"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProfileDirectImport() {
    const params = useRouter();
    const [profileId, setProfileId] = useState('');

    useEffect(() => {
        if (params.query.id) {
            setProfileId(params.query.id);
        }
    }, [params.query.id]);

    useEffect(() => {
        if (profileId) {
            console.log(profileId);
            saveProfileIdToBrowser(profileId);
        }
    }, [profileId]);

    function saveProfileIdToBrowser(id) {
        const profileIds = JSON.parse(localStorage.getItem('profileIds'));

        if (profileIds.includes(id)) {
            alert('Profile already imported.');
            return;
        } else {
            fetch(`/api/profiles`)
                .then((response) => response.json())
                .then((data) => {
                    if (!data.find(profile => profile.id === id)) {
                        alert('That profile does not exist! Make sure you entered the correct ID.');
                        return;
                    } else {
                        // Proceed with importing the profile
                        profileIds.push(id);
                        localStorage.setItem('profileIds', JSON.stringify(profileIds));

                        fetch(`/api/profiles/${id}`)
                            .then((response) => response.json())
                            .then((data) => {
                                alert(`Profile imported. Welcome back, ${data.displayname}! Going to the Profile Manager.`);
                                window.location.href = '/profile';
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching profiles:', error);
                    alert('An error occurred while fetching profiles. Please try again later.');
                });
        }
    }
}