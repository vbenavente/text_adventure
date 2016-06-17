'use strict';

const angular = require('angular');

require('angular-mocks');
require('../app/js/client');

describe('Controller Tests', () => {
  let firstctrl;

  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      firstctrl = new $controller('GameController');
    });
  });

  it('should have a property gamelog', () => {
    console.log(firstctrl);
    expect(Array.isArray(firstctrl.model.gamelog)).toBe(true);
  });

  it('should start the game', () => {
    firstctrl.startGame();
    expect(firstctrl.model.userLocation).toBe('start');
  });
});
