import { data as data } from './login';

const BOOKS_ENDPOINT = 'http://localhost:3000/login';

module.exports = {
  post: jest.fn((url) => {
    switch (url) {
      case BOOKS_ENDPOINT:
        return Promise.resolve({
          data: data
        });
    }
    console.log("chkdsk");
  })
};
