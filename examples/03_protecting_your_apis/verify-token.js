var jwt = require('jsonwebtoken');

var payload = {id: 0};
var secret = 'wyuflgjwuylf';
var options = {};

jwt.sign(payload, secret, options, getToken);

function getToken(token){
  jwt.verify(token, secret, options, verifyToken);
}

function verifyToken(err, decoded){
  console.log(decoded);
}
