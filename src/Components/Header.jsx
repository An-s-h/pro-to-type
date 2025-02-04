import React from 'react'
import AccountCircle from './AccountCircle'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
    <div className="logo pacifico-regular">
      Pro-To-Type
    </div>
    <Link to="/leaderboard">
          <LeaderboardIcon />
        </Link>
    <div className="user-icon">
      <AccountCircle/>
    </div>
    </div>
  )
}

export default Header
