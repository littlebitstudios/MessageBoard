import React from 'react';
import { useRouter } from 'next/router';
import '/styles/main.css';
import EditProfileForm from '../../app/editprofileform';
import NewProfileForm from '../../app/newprofileform';

export default function Page() {
  const params = useRouter();
  console.log(params);

  return (
    <>
      <h1>New Profile</h1>
      <NewProfileForm/>
    </>
  );
}