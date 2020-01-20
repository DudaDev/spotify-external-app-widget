import express from 'express';
import cors from 'cors';
import request from 'request';

const CLIENT_ID = '0e0a1f4ec0184de4ab1642a1734f7d75';
const CLIENT_SECRET = '6ed4ebd5840746da9f33f56bad6fc5af';
const API_BASE = 'https://api.spotify.com';
const API_PATH = '/v1';

const app = express();

app.use(cors());

app.get('/token', (req, res) => {
  // TODO: this can expire, need to check and refresh.
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(options, (error, response, body) => {
    res.json(body)
  });
});


app.use('/spotify', (req, res) => {
  const options = {
    json: true,
    url: API_BASE + API_PATH + req.url,
    headers: {
      'Authorization': req.headers.authorization
    }
  }

  request[req.method.toLowerCase()](options, (error, response, body) => {
    res.json(body);
  });
});

export default app;

