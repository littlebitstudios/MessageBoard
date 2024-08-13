import React from 'react';
import '/styles/main.css';

export default function Page() {
  return (
    <>
      <a className="button" href="/">Go back</a>
      <h1>About This Website</h1>
      <p>
        LittleBit's Message Board; a very simple message board written with Next.js.
      </p>
      <h2>Credits</h2>
      <p>
        LittleBit's Message Board is a project by James Herron (LittleBit).<br/>
        The code for this software is available on <a href="https://github.com/jaherron/MessageBoard">GitHub</a>. Licensed under the MIT License.<br/><br/>
        Written using <a href="https://nextjs.org">Next.js</a>, a React framework.<br/><br/>
        Public deployments handled by <a href="https://vercel.com">Vercel</a>.<br/><br/>
        Default profile picture from <a href="https://icons8.com">Icons8</a>. Download the icon <a href="https://icons8.com/icon/106PofAoe3p7/person">here</a>.<br/><br/>
        Font used across this website is Inter by Rasmus Andersson. Learn more or download from <a href="https://rsms.me/inter/">the author's website</a>.<br/><br/>
      </p>
    </>
  );
}