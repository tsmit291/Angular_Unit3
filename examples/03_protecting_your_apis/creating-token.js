var jwt = require('jsonwebtoken');

var payload = {id: 0};
var secret = 'wyuflgjwuylf';
var options = {};

jwt.sign(payload, secret, options, getToken);

function getToken(token){
  console.log(token);
}
