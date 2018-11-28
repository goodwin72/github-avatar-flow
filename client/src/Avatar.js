import React from 'react';
import './styles/Avatar.css';

const Avatar = ({ avatarURL, login }) => {
  return (
    <img src={avatarURL} alt={`${login}'s avatar`} />
  );
};

export default Avatar;
