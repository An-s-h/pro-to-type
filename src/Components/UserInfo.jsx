import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseConfig";
import { useTheme } from '../Contexts/ThemeContext';

const UserInfo = ({ totalTestsTaken }) => {
  const [user] = useAuthState(auth);
  const { theme } = useTheme();

  return (
    <div className="max-w-xs p-4 rounded-lg shadow-md" style={{ background: theme.typeBoxTest, color: theme.textColor }}>
      <div className="flex items-center mb-4">
        <div className="mr-3">
          
          <AccountCircleIcon fontSize="large" style={{ color: theme.textColor }} />
        </div>
        <div>
          <div className="font-semibold text-lg">{user ? user.email : "No user signed in"}</div>
          <div className="text-sm" style={{ color: theme.textColor }}>
            <span className="font-medium">Joined At:</span> {user ? new Date(user.metadata.creationTime).toLocaleDateString() : "Loading..."}
          </div>
        </div>
      </div>
      <div className="text-sm font-medium" style={{ color: theme.textColor }}>
        <span>Total Tests Taken:</span> {totalTestsTaken}
      </div>
    </div>
  );
}

export default UserInfo;