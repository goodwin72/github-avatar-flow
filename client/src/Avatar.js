import React from 'react';
import PropTypes from 'prop-types';
import './styles/Avatar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Avatar = (props) => {
  return (
    <div>
      <img
        id={props.login}
        className={`img-fluid ${props.extraClasses}`}
        src={props.avatarURL}
        alt={`${props.login}'s avatar`}
        data-html='true'
        onMouseEnter={props.handleMouseEnter}
        onMouseLeave={props.handleMouseLeave}
      />
    </div>
  );
};

Avatar.defaultProps = {
  'handleMouseEnter': undefined,
  'handleMouseLeave': undefined,
  'extraClasses': '',
};

Avatar.propTypes = {
  'avatarURL': PropTypes.string.isRequired,
  'login': PropTypes.string.isRequired,
  'handleMouseEnter': PropTypes.func,
  'handleMouseLeave': PropTypes.func,
  'extraClasses': PropTypes.string,
};

export default Avatar;
