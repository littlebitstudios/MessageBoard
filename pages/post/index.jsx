import React from 'react';
import '/styles/main.css';
import NewPostForm from '../../app/newpostform';

export default function HomePage() {
  return (
    <>
      <h1>Write a Post</h1>
      <NewPostForm />
    </>
  );
}