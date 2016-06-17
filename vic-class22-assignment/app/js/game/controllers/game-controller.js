'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.model = {
    userLocation: 'start',
    userHasWeapon: false,
    command: '',
    gamelog: [],
    location: {
      'start': {
        commands: ['Enter ? for available commands at any time', 'enter door on left', 'enter door on right'],
        prompt: 'Welcome to your Quest. You must acquire a weapon to defeat the a monster in order to leave this building.'
      },
      'weaponroom': {
        commands: ['take the dick\'s burger', 'take the beard oil', 'take the soccerball', 'take the iced tea', 'say <message>', 'walk through door'],
        prompt: 'You are in the weapon room. There is a weapon in each corner, a dick\'s burger, beard oil, a soccerball, and iced tea. One of these items may defeat the monster you encounter.'
      },
      'monsterroomwithoutweapon': {
        commands: ['walk through door', 'say <message>'],
        prompt: 'You are in a room with a hairy monster.'
      },
      'monsterroomwithweapon': {
        commands:['pour beard oil on floor', 'feed monster dick\'s burger', 'quench monster thirst with iced tea', 'distract with soccerball'],
        prompt: 'You are in a room with a monster and you have a weapon.'
      }
    }
  };
  GameController.prototype.startGame = function() {
    this.model.gamelog = [];
    this.model.userLocation = 'start';
    this.model.userHasWeapon = false;
    this.model.command = '';
    this.model.gamelog.push({
      src: 'game',
      msg: this.model.location.start.prompt
    });
    this.model.location.start.commands.forEach((choice) => {
      this.model.gamelog.push({
        src: 'command',
        msg: choice
      });
    });
    this.model.userLocation = 'start';
  };
  GameController.prototype.processInput = function() {
    this.model.gamelog.push({
      src: 'user',
      msg: this.model.command
    });

    switch (this.model.command) {
    case '?':
      this.model.gamelog.push({
        src: 'command',
        msg: this.currentHelpMsg()
      });
      break;
    case 'enter door on left':
      var currentLocation = this.model.userLocation;
      if(currentLocation === 'weaponroom') {
        currentLocation = this.model.userLocation = this.model.userHasWeapon ? 'monsterroomwithweapon' : 'monsterroomwithoutweapon';
        this.model.gamelog.push({
          src: 'game',
          msg: this.model.location[currentLocation].prompt
        });
      } else {
        this.model.userLocation = 'weaponroom';
        this.model.gamelog.push({
          src: 'game',
          msg: this.model.location.weaponroom.prompt
        });
      }

      this.model.gamelog.push({
        src: 'game',
        msg: this.currentHelpMsg()
      });
      break;
    case 'take the dick\'s burger':
      this.model.userHasWeapon = true;
      break;

    default:

      var sayArr = this.model.command.split(' ');
      if(sayArr[0] === 'say') {
        this.model.gamelog.push({
          src:'game',
          msg: sayArr.split(1, sayArr.length).join(' ') || 'SPEAK!'
        });
      } else {
        this.model.gamelog.push({
          src: 'game',
          msg: 'BAD COMMAND: Enter ? to see commands'
        });
      }
    }
    this.model.command = '';
  };
  GameController.prototype.currentHelpMsg = function() {
    var str = '';
    switch(this.model.userLocation) {
    case 'start':
      this.model.location.start.commands.forEach((choice, index) => {
        str += index > 0 ? ' | ' : '';
        str += choice;
      });
      break;
    case 'weaponroom':
      this.model.location.weaponroom.commands.forEach((choice, index) => {
        str += index > 0 ? ' | ' : '';
        str += choice;
      });
      break;
    case 'monsterroomwithoutweapon':
      this.model.location.monsterroomwithoutweapon.commands.forEach((choice, index) => {
        str += index > 0 ? ' | ' : '';
        str += choice;
      });
      break;
    }
    return str;
  };
}
