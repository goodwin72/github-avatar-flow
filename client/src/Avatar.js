import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Avatar = ({ avatarURL, login }) => {
  return (
    <div>
      <img className='img-fluid' src={avatarURL} alt={`${login}'s avatar`} />
    </div>
  );
};

Avatar.propTypes = {
  'avatarURL': PropTypes.string.isRequired,
  'login': PropTypes.string.isRequired,
};

export default Avatar;
