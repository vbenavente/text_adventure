'use strict';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

const server = app.listen(3000, function() {
  console.log('server is listening on %s', server.address().port);
});
