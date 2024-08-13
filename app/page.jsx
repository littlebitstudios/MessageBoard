import React from 'react';
import '../styles/main.css';
import { PrismaClient } from '@prisma/client';
import PostContainer from './postcontainer';
import SignInManager from './signinmanager';
import SessionProviderWrapper from './sessionproviderwrapper';

export const prisma = new PrismaClient();

export default async function HomePage() {
  return (
    <SessionProviderWrapper>
      <h1>LittleBit's Message Board</h1>
      <PostContainer />
    </SessionProviderWrapper>
  );
}