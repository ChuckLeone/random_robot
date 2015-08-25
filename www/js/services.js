angular.module('starter.services', ['ionic.utils'])

.factory('Robots', function($localstorage){
  var robots = [];
  
  return {
    all: function() {
      console.log($localstorage);
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
      }
   );
    },
    get: function(robotId) {
      for (var i = 0; i < robots.length; i++) {
        if (robots[i].id === parseInt(robotId)) {
          return robots[i];
        }
      }
      return null;
    }
  };
  
})

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);