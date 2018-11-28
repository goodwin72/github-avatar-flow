import React, { Component } from 'react';
import Avatar from './Avatar';
import BaseURLs from './BaseURLs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AvatarList.css';

const STARTING_REPO = 999;

class User {
  constructor(login, id, avatarURL) {
    this.login = login;
    this.id = id;
    this.avatarURL = avatarURL;

    /* Set explicitly to 'undefined' because we don't know whether they do or don't exist
     * for this user yet. */
    this.followers = undefined;
  }
}

class AvatarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'users': [],
      'loading': true,
      'networkError': false,
    };
  }

  componentDidMount() {
    fetch(`${BaseURLs.repos}${STARTING_REPO}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        let responseUsers = JSON.parse(JSON.stringify(response)).map((value) => {
          return new User(value.login, value.id, value.avatar_url);
        });

        // slice(0) creates a new array instead of copying a reference
        let newUsers = this.removeDuplicateUsers(responseUsers);

        this.setState({
          'users': newUsers,
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

        return Promise.reject(error);
      });
  }

  removeDuplicateUsers(users) {
    console.log('Prior to filter: ', users);
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
    console.log('After filter: ', filteredUsers);

    return filteredUsers;
  }

  render() {
    const avatars = this.state.users.map((value) => {
      return (
        <li className='avatar__li' key={value.id}>
          <Avatar avatarURL={value.avatarURL} login={value.login} />
        </li>
      );
    });

    let loading;
    if (this.state.loading) {
      loading = <p className='alert alert-primary' role='alert'>Loading...</p>;
    }

    if (this.state.networkError) {
      loading = <p className='alert alert-danger' role='alert'>Failed to load from the GitHub API!</p>;
    }

    return (
      <div>
        <ul className='d-flex flex-wrap list-unstyled'>
          {avatars}
        </ul>
        {loading}
      </div>
    );
  }
}

export default AvatarList;
