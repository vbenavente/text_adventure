'use strict';

const angular = require('angular');

var adventureApp = angular.module('adventure', []); require('./game/game')(adventureApp);
