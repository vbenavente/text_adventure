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
        commands: ['take the dick\'s burger', 'take the beard oil', 'take the soccerball', 'take the iced tea', 'say <message>', 'exit this room'],
        prompt: 'You are in the weapons room. There is a weapon in each corner, a dick\'s burger, beard oil, a soccerball, and iced tea. One of these items may defeat the monster you encounter.'
      },
      'monsterroomwithoutweapon': {
        commands: ['run back to the hallway', 'try to fight the monster', 'say <message>'],
        prompt: 'You are in a room with a monster and you have no weapon!'
      },
      'monsterroomwithweapon': {
        commands:['pour beard oil on hairy monster', 'throw dick\'s burger at hungry monster', 'quench  dusty monster\'s thirst with iced tea', 'distract sporty monster with soccerball'],
        prompt: 'You are in a room with a monster and you have a weapon. Which weapon do you want to use?'
      },
      'hairymonsterroom': {
        commands:['select a weapon', 'say <message>'],
        prompt: ['You are in a room with a hairy monster! What do you want to do?']
      },
      'sportymonsterroom': {
        commands:['select a weapon', 'say <message>'],
        prompt: ['You are in a room with a sporty monster! What do you want to do?']
      },
      'hungrymonsterroom': {
        command: ['select a weapon', 'say <message>'],
        prompt: ['You are in a room with a hungry monster! What do you want to do?']
      },
      'dustymonsterroom': {
        commands: ['select a weapon', 'say <message>'],
        prompt: ['You are in a room with a dusty thirsty monster! What do you want to do?']
      },
      'downstairshallway': {
        commands: ['enter door 1', 'enter door 2', 'enter door 3', 'enter door 4', 'go upstairs', 'say <message>'],
        prompt: ['You are in the downstairs hallway, where to next?']
      },
      'upstairshallway': {
        commands: ['enter door 5', 'enter door 6', 'enter door 7', 'enter door 8', 'go downstairs', 'say <message>'],
        prompt: ['You are in the upstairs hallway, where to next?']
      }
    }
  };
  GameController.prototype.startGame = function() {
    this.model.gamelog = [];
    this.model.userLocation = 'start';
    this.model.userHasWeapon = true;
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

    case 'enter door 2':
    // var currentLocation = this.model.userLocation;
    // if(currentLocation === 'weaponroom') {
    //   currentLocation = this.model.userLocation = this.model.userHasWeapon ? 'monsterroomwithweapon' : 'monsterroomwithoutweapon';
    //   this.model.gamelog.push({
    //     src: 'game',
    //     msg: this.model.location[currentLocation].prompt
    //   });
    // } else {

      this.model.userLocation = 'hairymonsterroom';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location.hairymonsterroom.prompt
      });

      break;
    case 'select a weapon':
      if(this.model.userHasWeapon === true) {
        this.model.gamelog.push({
          src: 'game',
          msg: this.listWeapons()
        });
      }
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
    this.model.userHasWeapon = true;
    this.model.gamelog.push({
      src: 'game',
      msg: 'You have acquired a weapon!'
    });
  };

  GameController.prototype.listWeapons = function() {
    var weaponsAcquired = [];
    console.log(GameController.processInput.userHasBurgerWeapon);
    if(GameController.processInput.userHasBurgerWeapon === true) {
      weaponsAcquired.push({
        src: 'game',
        msg: 'dick\'s burger'
      });
    }
  };

  GameController.prototype.displayHelpMsg = function(room) {
    var str = '';
    var input = room;
    this.model.location[input].commands.forEach((choice, index) => {
      str += index > 0 ? ' | ' : '';
      str += choice;
    });
    console.log(this.model.location[input].commands);
    return str;
  };

  GameController.prototype.currentHelpMsg = function() {
    var str = '';
    // if(this.model.userlocation === 'start') {
    //   this.displayHelpMsg('start');
    // }
    switch(this.model.userLocation) {
    case 'start':
      // this.model.location.start.commands.forEach((choice, index) => {
      //   str += index > 0 ? ' | ' : '';
      //   str += choice;
      // });
      str = this.displayHelpMsg('start');
      console.log('start');
      break;
    case 'weaponroom':
      str = this.displayHelpMsg('weaponroom');
      console.log('weaponroom');
      break;
    // case 'monsterroomwithoutweapon':
    //   this.model.location.monsterroomwithoutweapon.commands.forEach((choice, index) => {
    //     str += index > 0 ? ' | ' : '';
    //     str += choice;
    //   });
    //   break;
    }
    return str;
  };
}
