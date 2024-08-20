"use client";

import { useState } from 'react';

export default function DeleteButton({id, fetchFunction}) {
    const [authorProfileId, setAuthorProfileId] = useState('');

    async function deletePost() {
        fetch(`/api/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthorProfileId(data.profileId);
            });

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            if (authorProfileId !== localStorage.getItem('defaultProfileId')) {
                alert('You cannot delete this post, you are not its author. If you are the author, go to the Profile Manager and choose the correct profile.');
                return;
            }
        }

        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        fetchFunction();
    }

    return (
        <button onClick={deletePost}>Delete</button>
    );
}