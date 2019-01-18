import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import BaseURLs from './BaseURLs';
import './styles/Avatar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'followers': [],
      'networkError': false,
      'popoverOpen': false,
    };

    this.displayFollowersPopover = this.displayFollowersPopover.bind(this);
    this.removeFollowersPopover = this.removeFollowersPopover.bind(this);
  }

  displayFollowersPopover(e) {
    fetch(`${BaseURLs.followers}${this.props.login}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          'followers': response,
          'networkError': false,
          'popoverOpen': true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          'networkError': true,
        });
      });
  }

  removeFollowersPopover(e) {
    this.setState({
      'popoverOpen': false,
    });
  }

  render() {
    let followerDisplay = '';
    followerDisplay = this.state.followers.map((value) => {
      return <li>{value.login}</li>;
    });

    // Extra classes conditionally applied to the img
    let classes = [];

    // This will have the onHover callback for Avatars with logins that start
    //  with 'a' or 'A' - otherwise, this will be empty.
    let handleMouseEnter;
    let handleMouseLeave;
    if (this.props.login.substring(0, 1) === 'a') {
      classes.push('avatar__img--highlighted');
      handleMouseEnter = this.displayFollowersPopover;
      handleMouseLeave = this.removeFollowersPopover;
    }

    let popOverContent;
    if (!this.state.networkError) {
      popOverContent = (
        <ul className='popoverFollowers'>
          {followerDisplay}
        </ul>
      );
    } else {
      popOverContent = 'A network error occurred';
    }

    return (
      <div>
        <img
          id='Popover1' // TEMP - CHANGE LATER
          className={`img-fluid ${classes.join(' ')}`}
          src={this.props.avatarURL}
          alt={`${this.props.login}'s avatar`}
          data-html='true'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Popover placement='right' isOpen={this.state.popoverOpen} target='Popover1'>
          <PopoverHeader>
            {this.props.login}
          </PopoverHeader>
          <PopoverBody>
            {popOverContent}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

Avatar.propTypes = {
  'avatarURL': PropTypes.string.isRequired,
  'login': PropTypes.string.isRequired,
};

export default Avatar;
