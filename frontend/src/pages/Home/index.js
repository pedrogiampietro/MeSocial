import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Topbar } from '../../components/Topbar';
import { Feed } from '../../components/Feed';
import { Rightbar } from '../../components/Rightbar';

import './styles.css';

export function Home() {
  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
