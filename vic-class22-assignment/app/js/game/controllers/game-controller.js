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
        commands: ['Enter ? for available commands at any time', 'enter door 1', 'enter door 2', 'enter door 3', 'enter door 4', 'go upstairs'],
        prompt: 'Welcome to your Quest. This building has 8 rooms, 1 weapons room, 4 rooms with monsters, 2 safe rooms, and a treasury. You can exit through any of the four monster rooms after defeating the monster. Acquire weapons to defeat a monster and safely escape. You are currently in the hallway.'
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
    this.model.userHasBurgerWeapon = false;
    this.model.userHasBeardWeapon = false;
    this.model.userHasSoccerWeapon = false;
    this.model.userHasTeaWeapon = false;
    this.model.command = '';
    this.model.gamelog.push({
      src: 'game',
      msg: this.model.location.start.prompt
    });
    this.model.gamelog.push({
      src: 'command',
      msg: this.currentHelpMsg()
    });
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
    case 'enter door 1':
      // var currentLocation = this.model.userLocation;
      // if(currentLocation === 'weaponroom') {
      //   currentLocation = this.model.userLocation = this.model.userHasWeapon ? 'monsterroomwithweapon' : 'monsterroomwithoutweapon';
      //   this.model.gamelog.push({
      //     src: 'game',
      //     msg: this.model.location[currentLocation].prompt
      //   });
      // } else {
      this.model.userLocation = 'weaponroom';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location.weaponroom.prompt
      });
      // }

      // this.model.gamelog.push({
      //   src: 'command',
      //   msg: this.currentHelpMsg()
      // });
      break;
    case 'take the dick\'s burger':
      this.model.userHasBurgerWeapon = true;
      this.acquiredWeapon();
      break;
    case 'take the beard oil':
      this.model.userHasBeardWeapon = true;
      this.acquiredWeapon();
      break;
    case 'take the soccerball':
      this.model.userHasSoccerWeapon = true;
      this.acquiredWeapon();
      break;
    case 'take the iced tea':
      this.model.userHasTeaWeapon = true;
      this.acquiredWeapon();
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

  GameController.prototype.acquiredWeapon = function() {
    this.model.gamelog.push({
      src: 'game',
      msg: 'You have acquired a weapon!'
    });
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
