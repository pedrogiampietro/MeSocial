import React from 'react';
import './styles.css';

import { Post } from '../Post/';
import { Share } from '../Share';
import { Posts } from '../../dummyData';

export function Feed() {
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />
        {Posts.map(p => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
