const axios = require('axios');
const express = require('express');
const app = express();

function makeErrorResponse(res, error) {
  // console.log(error);
  res.status(error.response.status || 500)
    .send(error.response.data.message || 'An unknown error occurred.');
}

function extractOwnerDataFromReposList(data) {
  const processedUsers = data.map((repo) => {
    return {
      'login': repo.owner.login,
      'id': repo.owner.id,
      'avatar_url': repo.owner.avatar_url,
    };
  });

  return processedUsers;
}

function getPublicRepoOwners(startingRepo) {
  return axios.get(`https://api.github.com/repositories?since=${startingRepo}`)
    .then((response) => {
      return extractOwnerDataFromReposList(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function extractFollowerDataFromFollowersList(data) {
  const processedFollowers = data.map((follower) => {
    return {
      'login': follower.login,
      'id': follower.id,
    };
  });

  return processedFollowers;
}

function getFollowerList(login) {
  return axios.get(`https://api.github.com/users/${login}/followers`)
    .then((response) => {
      return extractFollowerDataFromFollowersList(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

app.get('/repos', (req, res) => {
  getPublicRepoOwners(req.query.since)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      makeErrorResponse(res, error);
    });
});

app.get('/followers', (req, res) => {
  getFollowerList(req.query.login)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      makeErrorResponse(res, error);
    });
});

let listener = app.listen(3000, () => {
  console.log(`App listening on port ${listener.address().port}!`);
});

module.exports = listener;
