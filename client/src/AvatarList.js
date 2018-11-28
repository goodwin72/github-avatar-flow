import React, { Component } from 'react';
import Avatar from './Avatar';
import './styles/AvatarList.css';

const STARTING_REPO = 999;

class User {
  constructor(username, id, avatarURL, followersURL) {
    this.login = username;
    this.id = id;
    this.avatarURL = avatarURL;
    this.followersURL = followersURL;

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
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/repos?since=${STARTING_REPO}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        let responseUsers = JSON.parse(JSON.stringify(response)).map((value) => {
          return new User(value.login, value.id, value.avatar_url, value.followers_url);
        });

        // slice(0) creates a new array instead of copying a reference
        let newUsers = this.removeDuplicateUsers((this.state.users.slice(0)).concat(responseUsers));

        this.setState({
          'users': newUsers,
          'loading': false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          'loading': false,
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
        <li key={value.id}>
          <Avatar avatarURL={value.avatarURL} login={value.login} />
        </li>
      );
    });

    let loading;
    if (this.state.loading) {
      loading = <p>Loading...</p>;
    }

    return (
      <div className='avatarList'>
        <ul>
          {avatars}
        </ul>
        {loading}
      </div>
    );
  }
}

export default AvatarList;