"use client";
import { useState, useEffect } from 'react';
import DeleteButton from './deletebutton.jsx';

export default function PostContainer() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function writeButton() {
    window.location.href = '/post';
  }

  return (
    <>
      <button onClick={fetchPosts}>Reload Posts</button>
      <a href="/post" className='button'>Write a Post</a>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="profile-container">
            <img src={post.profilePicture} />
            <div className="text-container">
              <strong>{post.displayname}</strong>
              <br />@{post.username}
            </div>
          </div>
          <p>{post.content}</p>
          <DeleteButton id={post.id} fetchFunction={fetchPosts}/>
        </div>
      ))}
    </>
  );
}