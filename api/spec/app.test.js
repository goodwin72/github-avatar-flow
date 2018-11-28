/* eslint global-require: 0,
 * eslint no-trailing-spaces: 0,
 */

const axios = require('axios');

describe('Server', () => {
  let server;

  // Before any testing, start the server fresh
  beforeAll(() => {
    // Server is a listener
    server = require('../index.js');
  });

  // After all testing is done, close the server
  afterAll(() => {
    server.close();
  });

  describe('GET /repos', () => {
    let response;

    beforeAll(() => {
      return axios.get(`http://localhost:${server.address().port}/repos?since=0`)
        .then((resp) => {
          response = resp;
        });
    });

    it('has a status code of 200', () => {
      expect(response.status).toBe(200);
    });

    it('returns a user login, id, and avatar', () => {
      expect(response.data[0].login).toBeDefined();
      expect(response.data[0].id).toBeDefined();
      expect(response.data[0].avatar_url).toBeDefined();
    });

    it('does not return more information than the client needs', () => {
      expect(Object.keys(response.data[0]).length).toBe(3);
    });
  });

  describe('GET /followers', () => {
    let response;

    beforeAll(() => {
      return axios.get(`http://localhost:${server.address().port}/followers?andykent`)
        .then((resp) => {
          response = resp;
        });
    });

    it('has a status code of 200', () => {
      expect(response.status).toBe(200);
    });

    it('returns a user login and id', () => {
      expect(response.data[0].login).toBeDefined();
      expect(response.data[0].id).toBeDefined();
    });

    it('does not return more information than the client needs', () => {
      expect(Object.keys(response.data[0]).length).toBe(2);
    });
  });
});
