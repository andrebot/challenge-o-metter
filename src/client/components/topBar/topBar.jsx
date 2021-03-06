import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuButton from '../menuButton/menuButton.jsx';
import DropDownMenuItem from '../dropdownMenuItem/dropdownMenuItem.jsx';
import MenuSlideButton from '../menuSlideButton/menuSlideButton.jsx';
import { useAuth } from '../../hooks/authContext.jsx';

import './topBar.styl';

const TopBar = () => {
  const { user } = useAuth();
  const history = useHistory();
  const logout = () => history.push('/');
  // const dashboard = () => history.push('/main/dashboard');

  return (
    <div className="top-bar">
      <div className="app-menu">
        <MenuSlideButton>
          <div className="menu-item">
            <span href="/main/account-book">Account book</span>
          </div>
        </MenuSlideButton>
      </div>
      <div className="app-title">Finanças</div>
      <div className="user-menu">
        <MenuButton text={`Hello, ${user.name}`}>
          <DropDownMenuItem text="Settings" icon={'/icons/settings.svg'}></DropDownMenuItem>
          <DropDownMenuItem text="Logout" icon={'/icons/logout.svg'} action={logout}></DropDownMenuItem>
        </MenuButton>
      </div>
    </div>
  );
};

export default TopBar;
