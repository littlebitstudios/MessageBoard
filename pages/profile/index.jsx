import React from 'react';
import '/styles/main.css';
import ProfileSelector from '../../app/profileselector';

export default function Page() { 
  return (
    <>
      <h1>Profile Manager</h1>
      <a className="button" href="/">Back to main page</a> <a className="button" href="/profile/new">Create New Profile</a>
      <ProfileSelector />
    </>
  );
}