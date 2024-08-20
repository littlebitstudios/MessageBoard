import React from 'react';
import { useRouter } from 'next/router';
import '/styles/main.css';
import EditProfileForm from '../../app/editprofileform';

export default function Page() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <h1>Edit Profile</h1>
      <EditProfileForm profileId={params.query.id}/>
    </>
  );
}