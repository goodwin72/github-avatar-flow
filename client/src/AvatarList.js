import React, { Component } from 'react';
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
    };

    this.getNextUsersPage = this.getNextUsersPage.bind(this);
  }

  componentDidMount() {
    this.getNextUsersPage();
  }

  getNextUsersPage() {
    this.setState({
      'loading': true,
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

  render() {
    const avatars = this.state.users.map((value) => {
      return (
        <li className='avatarList__li' key={value.id}>
          <Avatar avatarURL={value.avatarURL} login={value.login} id={value.id} />
        </li>
      );
    });

    let loading;
    let loadMoreButton;
    if (this.state.loading) {
      loading = <p className='alert alert-primary' role='alert'>Loading...</p>;
    } else {
      loadMoreButton = <button className='btn btn-lg btn-outline-primary avatarList__btn' type='button' onClick={this.getNextUsersPage}>Load next</button>;
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
        {loadMoreButton}
      </div>
    );
  }
}

export default AvatarList;
