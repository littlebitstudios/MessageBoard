"use client";
import { useState, useEffect, useRef } from 'react';
import DeleteButton from './deletebutton.jsx';

export default function PostContainer() {
  const [posts, setPosts] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState('');
  const [currentProfile, setCurrentProfile] = useState({});
  const [allProfiles, setAllProfiles] = useState([]);
  const [profileLookup, setProfileLookup] = useState({});
  const alertShown = useRef(false);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const profileId = localStorage.getItem('defaultProfileId');
      if (profileId) {
        setCurrentProfileId(profileId);
        fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
          setCurrentProfile(data);
        });
      } else if (!alertShown.current) {
        alert("Welcome! Apparently it's your first time here. You can view posts without a profile, but you'll need to create (or import) one to post. Visit the Profile Manager to get started.");
        alertShown.current = true; // Set the ref to true after showing the alert
      }
    }

    fetch("/api/profiles").then((response) => response.json()).then((data) => {
      setAllProfiles(data);
      const lookup = data.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
      setProfileLookup(lookup);
    });
  }, []);

  return (
    <>
      <p>
        Current profile: {currentProfileId ? `${currentProfile.displayname} (@${currentProfile.username})` : `[no profile]`} <a className="button" href="/profile">Profile Manager</a>
      </p>
      <button onClick={fetchPosts}>Reload Posts</button>
      <a href="/post" className='button'>Write a Post</a>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => {
          const formattedDateTime = new Date(post.createdAt).toLocaleString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          const author = profileLookup[post.profileId] || {
            displayname: '[Deleted Profile]',
            username: 'deleted',
            profilePicture: 'https://img.icons8.com/fluency/48/person-male.png'
          };

          if (!author) {
            return null;
          }

          return (
            <div key={post.id} className="post">
              <div className="profile-container">
                <img width="48" height="48" src={author.profilePicture || 'https://img.icons8.com/fluency/48/person-male.png'} />
                <div className="text-container">
                  <strong>{author.displayname}</strong>
                  <br />@{author.username} - posted on {formattedDateTime}
                </div>
              </div>
              <p>{post.content}</p>
              <DeleteButton id={post.id} fetchFunction={fetchPosts} />
              <a href={`/post/${post.id}`} className='button'>Edit</a>
            </div>
          );
        })}
    </>
  );
}