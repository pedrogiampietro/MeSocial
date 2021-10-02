import React from 'react';
import axios from 'axios';

import { Post } from '../Post/';
import { Share } from '../Share';

import './styles.css';

export function Feed({ username }) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get('posts/timeline/6149e1bb6939a8cdce27fe8e');
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
