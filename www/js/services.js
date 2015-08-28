angular.module('starter.services', ['ngStorage'])

.factory('Robots', function($localStorage){

 var $storage = $localStorage.$default({
   robots:[]
 });
 
 var robots=$storage.robots;
  
  return {
    all: function() {
      return robots;
    },
    remove: function(robot) {
      robots.splice(robots.indexOf(robot), 1);
    },
    add: function(robot) {
      robots.push({
        id: robot.id,
        name: robot.name,
        generation: robot.generation,
        color: robot.color,
        speed: robot.speed,
        armor: robot.armor,
        power: robot.power
      })
    },
    get: function(robotId) {
      for (var i = 0; i < robots.length; i++) {
        if (robots[i].id === parseInt(robotId)) {
          return robots[i];
        }
      }
      return null;
    },

    post: function () {
      $localStorage = robots;
      }
  };
  
});