import * as functions from 'firebase-functions';
export default functions.config();

/* for local testing without firebase environmental variables:

export default {
    spotify: {
        id: '',
        secret: '',
        base: 'https://api.spotify.com',
        path: '/v1'
    }
}

*/