import React from 'react';
import '../styles/main.css';
import { PrismaClient } from '@prisma/client';
import PostContainer from './postcontainer';
import ActiveProfileContainer from './activeprofilecontainer';

export const prisma = new PrismaClient();

export default async function HomePage() {
  return (
    <>
      <div className="header-container">
        <div>
          <a style={{paddingRight:"5px"}} href="/post" title="Write a post" className='image-button'><img src="https://img.icons8.com/?size=32&id=82802&format=png&color=FFFFFF" /></a>
          <a className="image-button" title="About this website" href="/about"><img src="https://img.icons8.com/?size=32&id=82889&format=png&color=FFFFFF" /></a>
        </div>
        <h1 className="hide-on-mobile">LittleBit's Message Board</h1>
        <ActiveProfileContainer />
      </div>
      <PostContainer />
    </>
  );
}