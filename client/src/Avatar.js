import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Avatar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Avatar extends Component {
  render() {
    // Extra classes conditionally applied to the img
    let classes = [];

    // This will have the onHover callback for Avatars with logins that start
    //  with 'a' or 'A' - otherwise, this will be empty.
    let handleMouseEnter;
    let handleMouseLeave;
    if (this.props.login.substring(0, 1) === 'a') {
      classes.push('avatar__img--highlighted');
      console.log("HANDLE MOUSE ENTER FUNCTION: ", this.props.handleMouseEnter);
      handleMouseEnter = () => { this.props.handleMouseEnter(this.props.login); };
      handleMouseLeave = () => { this.props.handleMouseLeave(); };
    }

    return (
      <div>
        <img
          id={this.props.login}
          className={`img-fluid ${classes.join(' ')}`}
          src={this.props.avatarURL}
          alt={`${this.props.login}'s avatar`}
          data-html='true'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    );
  }
}

Avatar.propTypes = {
  'avatarURL': PropTypes.string.isRequired,
  'login': PropTypes.string.isRequired,
};

export default Avatar;
