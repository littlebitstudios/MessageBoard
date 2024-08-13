"use client";

export default function DeleteButton({id, fetchFunction}) {
    async function deletePost() {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        fetchFunction();
    }

    return (
        <button onClick={deletePost}>Delete</button>
    );
}