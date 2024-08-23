import React from 'react';
import { useRouter } from 'next/router';
import '/styles/main.css';
import EditProfileForm from '../../app/editprofileform';

export default function Page() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <div className="header-container">
        <a href="/profile" title="Back to Profile Manager" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF"/></a>
        <h1 className="hide-on-mobile">Edit Profile</h1>
      </div>
      <EditProfileForm profileId={params.query.id}/>
    </>
  );
}