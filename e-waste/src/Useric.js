import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import React, { useState } from 'react';

function UserIcon() {
  // Replace this with the actual user data from your state management system
  const [user] = useState({ username: 'Ishaaaa' });

  return (
    <div className="d-flex align-items-center mr-9">
      <FontAwesomeIcon icon={faUser} className="mr-2" />
      {user.username}
    </div>
  );
}

export default UserIcon;
