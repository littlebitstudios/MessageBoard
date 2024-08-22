import React from 'react';
import '/styles/main.css';
import ProfileSelector from '../../app/profileselector';
import ActiveProfileContainer from '../../app/activeprofilecontainer';

export default function Page() { 
  return (
    <div>
      <div className="header-container">
        <a href="/" title="Back to main page" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF"/></a>
        <h1 className="hide-on-mobile">Profile Manager</h1>
        <a href="/profile/new" title="Create new profile" className='image-button'><img src="https://img.icons8.com/?size=32&id=82802&format=png&color=FFFFFF"/></a>
      </div>
      <ProfileSelector />
    </div>
  );
}