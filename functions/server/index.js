import express from 'express';
import cors from 'cors';
import request from 'request';
import config from '../config';

const { id: CLIENT_ID, secret: CLIENT_SECRET, base: API_BASE, path: API_PATH } = config.spotify

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
