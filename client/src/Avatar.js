import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Avatar = ({ avatarURL, login }) => {
  let classes = [];

  if (login.substring(0, 1) === 'a') {
    classes.push('avatar__li--highlighted');
  }

  return (
    <img className={`img-fluid ${classes.join(' ')}`} src={avatarURL} alt={`${login}'s avatar`} />
  );
};

Avatar.propTypes = {
  'avatarURL': PropTypes.string.isRequired,
  'login': PropTypes.string.isRequired,
};

export default Avatar;
