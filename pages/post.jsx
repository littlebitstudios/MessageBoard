import React from 'react';
import '../styles/main.css';
import PostForm from "/app/postform.jsx";

export default function HomePage() {
  return (
    <>
      <h1>Write a Post</h1>
      <PostForm />
    </>
  );
}