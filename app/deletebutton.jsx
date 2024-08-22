"use client";

import { useEffect, useState } from 'react';

export default function DeleteButton({id, fetchFunction}) {
    const [authorProfileId, setAuthorProfileId] = useState('');

    useEffect(() => {
        fetch(`/api/posts/${id}`).then((response) => response.json()).then((data) => {
            setAuthorProfileId(data.profileId);
        });
    }, []);

    async function deletePost() {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            if (authorProfileId !== localStorage.getItem('defaultProfileId')) {
                const profile = await fetch(`/api/profiles/${localStorage.getItem('defaultProfileId')}`).then((response) => response.json());
                if (!profile.moderator){
                    alert(`Cannot delete this post; you must be the post's author or a moderator to delete a post. If you are able to delete this post, please select the correct profile in the Profile Manager.`);
                    return;
                }
            }
        }

        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        fetchFunction();
    }

    return (
        <button onClick={deletePost} title="Delete post"><img src="https://img.icons8.com/?size=24&id=84930&format=png&color=FFFFFF"/></button>
    );
}