import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Avatar from './Avatar';
import BaseURLs from './BaseURLs';
import './styles/AvatarList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const STARTING_REPO = 999;

class User {
  constructor(login, id, avatarURL) {
    this.login = login;
    this.id = id;
    this.avatarURL = avatarURL;
  }
}

class AvatarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'users': [],
      'reposRead': 0,
      'loading': true,
      'networkError': false,
      'followers': [],
      'popoverOpen': false,
      'popoverLoading': false,
      'loginOfHoveredUser': null,
    };

    this.getNextUsersPage = this.getNextUsersPage.bind(this);
    this.displayFollowersPopover = this.displayFollowersPopover.bind(this);
    this.removeFollowersPopover = this.removeFollowersPopover.bind(this);
  }

  componentDidMount() {
    this.getNextUsersPage();
  }

  getNextUsersPage() {
    this.setState({
      'loading': true,
      'popoverOpen': false,
    });

    let startingRepo = STARTING_REPO;
    if (this.state.reposRead > 0) {
      startingRepo = STARTING_REPO + this.state.reposRead;
    }
    // console.log("StartingRepo:", startingRepo);

    return fetch(`${BaseURLs.repos}${startingRepo}`)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((response) => {
        return JSON.parse(JSON.stringify(response)).map((value) => {
          return new User(value.login, value.id, value.avatar_url);
        });
      })
      .then((responseUsers) => {
        // slice(0) creates a new array instead of copying a reference
        let newUsers = this.removeDuplicateUsers(responseUsers);
        let newReposRead = this.state.reposRead + responseUsers.length;

        this.setState({
          'users': newUsers,
          'reposRead': newReposRead,
          'loading': false,
          'networkError': false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          'loading': false,
          'networkError': true,
        });
      });
  }

  removeDuplicateUsers(users) {
    let filteredUsers = [];

    for (let currentUser = 0; currentUser < users.length; currentUser += 1) {
      let foundDuplicate = false;
      for (let previousUser = 0; previousUser < currentUser; previousUser += 1) {
        if (users[currentUser].id === users[previousUser].id) {
          foundDuplicate = true;
        }
      }

      if (!foundDuplicate) {
        filteredUsers.push(users[currentUser]);
      }
    }

    return filteredUsers;
  }

  displayFollowersPopover(login) {
    this.setState({
      'popoverOpen': true,
      'popoverLoading': true,
      'loginOfHoveredUser': login,
    });

    fetch(`${BaseURLs.followers}${login}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          'followers': response,
          'networkError': false,
          'popoverLoading': false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          'networkError': true,
          'popoverLoading': false,
        });
      });
  }

  removeFollowersPopover() {
    this.setState({
      'popoverOpen': false,
    });
  }

  render() {
    // Create an array of <li> elements storing Avatars.
    const avatars = this.state.users.map((value) => {
      return (
        <li className='avatarList__li' key={value.id}>
          <Avatar
            avatarURL={value.avatarURL}
            login={value.login}
            id={value.id}
            handleMouseEnter={this.displayFollowersPopover}
            handleMouseLeave={this.removeFollowersPopover}
          />
        </li>
      );
    });

    // Display loading notification or the load more button, depending on current loading status.
    let loading;
    let loadMoreButton;
    if (this.state.loading) {
      loading = <p className='alert alert-primary' role='alert'>Loading...</p>;
    } else {
      loadMoreButton = <button className='btn btn-lg btn-outline-primary avatarList__btn' type='button' onClick={this.getNextUsersPage}>Load next</button>;
    }

    // If there has been a network error, display an error message.
    if (this.state.networkError) {
      loading = <p className='alert alert-danger' role='alert'>Failed to load from the GitHub API!</p>;
    }

    // If follower data has been stored in state, create an array of <li> elements storing that data.
    let followerDisplay = '';
    followerDisplay = this.state.followers.map((value) => {
      return <li>{value.login}</li>;
    });

    let popoverContent;
    if (!this.state.networkError && !this.state.popoverLoading) {
      popoverContent = (
        <ul className='popoverFollowers'>
          {followerDisplay}
        </ul>
      );
    } else if (this.state.networkError) {
      popoverContent = 'A network error occurred';
    } else if (this.state.popoverLoading) {
      popoverContent = 'Loading...';
    } else {
      popoverContent = 'An unknown error occurred. (Sorry!)'
    }

    return (
      <div>
        <ul className='d-flex flex-wrap list-unstyled'>
          {avatars}
        </ul>
        {loading}
        {loadMoreButton}
        <Popover placement='right' isOpen={this.state.popoverOpen} target={this.state.loginOfHoveredUser}>
          <PopoverHeader>
            {this.state.loginOfHoveredUser}
          </PopoverHeader>
          <PopoverBody>
            {popoverContent}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default AvatarList;
