import React from 'react';
import axios from 'axios';

import { Topbar } from '../../components/Topbar';
import { Sidebar } from '../../components/Sidebar';
import { Feed } from '../../components/Feed';
import { Rightbar } from '../../components/Rightbar';
import { useParams } from 'react-router';

import './styles.css';

export function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = React.useState([]);
  const username = useParams().username;

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + 'person/noCover.png'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || PF + 'person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
