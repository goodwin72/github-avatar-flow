import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jQuery from 'jquery';
import Popper from 'popper.js';
import BaseURLs from './BaseURLs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'followers': [],
      'networkError': false,
    };

    this.displayFollowersPopover = this.displayFollowersPopover.bind(this);
    this.removeFollowersPopover = this.removeFollowersPopover.bind(this);
  }

  componentDidMount() {
    jQuery('[data-toggle="popover"]').popover();
  }

  displayFollowersPopover(e) {
    e.persist();
    let temp = e.target;

    fetch(`${BaseURLs.followers}${this.props.login}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(JSON.parse(JSON.stringify(response)));

        this.setState({
          'followers': response,
          'networkError': false,
        }, () => {
          jQuery(temp).popover('show');
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
    jQuery(e.target).popover('hide');
  }

  render() {
    // Bootstrap's data-content attribute will only accept HTML as a string, so
    //  we need to convert the followers list into a string-ified HTML list
    let followerDisplayString = '';
    this.state.followers.forEach((value) => {
      followerDisplayString += `<li>${value.login}</li>`;
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
      popOverContent = `<ul class="popoverFollowers">${followerDisplayString}</ul>`;
    }
    else {
      popOverContent = 'A network error occurred';
    }

    return (
      <div>
        <img
          className={`img-fluid ${classes.join(' ')}`}
          src={this.props.avatarURL}
          alt={`${this.props.login}'s avatar`}
          data-html='true'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-toggle='popover'
          data-trigger='none'
          title={this.props.login}
          data-content={popOverContent}
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
