let APIURL = '';
switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
  case 'saw-samlist-client.herokuapp.com':
    APIURL = 'https://saw-samlist-server.herokuapp.com';
    break;
  default:
    APIURL = null;
}
export default APIURL;
