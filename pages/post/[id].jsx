import React from 'react';
import { useRouter } from 'next/router';
import '/styles/main.css';
import EditPostForm from '/app/editpostform';

export default function HomePage() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <h1>Edit Post</h1>
      <EditPostForm postId={params.query.id} />
    </>
  );
}