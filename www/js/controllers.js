angular.module('starter.controllers', [])

.controller('RobotCtrl', function($scope, Robots) {
   $scope.robots = Robots.all();	
})

.controller('FactoryCtrl', function($scope, $ionicScrollDelegate, $timeout, $localStorage, Robots) {
	
	// db testing
	$scope.insert = function(firstname, lastname) {
		var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
		$cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(result) {
			console.log("INSERT ID -> " + result.insertId);
		}, function (error) {
			console.error(error);
		});
	}
	
		$scope.select = function(lastname) {
		var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
		$cordovaSQLite.execute(db, query, [lastname]).then(function(result) {
			if(result.rows.length > 0) {
				console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
			} else {
				console.log("No results found");
			}
		}, function (error) {
			console.error(error);
		});
	}
		// db testing
	
	// prevent scrolling on factory screen
	$timeout(function() {
	  $ionicScrollDelegate.$getByHandle('mainScroll').getScrollView().options.scrollingY = false
      }, 1000);
	
	$scope.destroyRobot = function(robot) {
		$scope.state.factoryEmpty = true;
		$scope.state.robotSaved = false;
		$scope.state.message = $scope.robot.name + ' ' + $scope.robot.generation + ' ' + 'retired!';
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		$scope.robot = {
			id: '',
		 	name: '',
			generation: '',
		    color: '',
			speed: '',
			armor: '',
			power: ''
		};
	}
	
	$scope.saveRobot = function(robot) {
		Robots.add($scope.robot);
		$scope.state.robotSaved = true;
		// $scope.state.factoryEmpty = true;
		// context.clearRect(0, 0, canvas.width, canvas.height);
		$scope.state.message = $scope.robot.name + ' ' +  $scope.robot.generation + ' ' + 'saved!';
		// $scope.robot = {
		// 	id: '',
		//  	name: '',
		// 	generation: '',
		//     color: '',
		// 	speed: '',
		// 	armor: '',
		// 	power: ''
		// };
		
		$localStorage.message = "Robot was saved";
	}
	
	$scope.loadRobot = function() {
		$scope.message = $localStorage.message;
	}
	
	$scope.factory = {
		version : '0.1'
	}
   
	$scope.state = {
		factoryEmpty: true,
		robotSaved: false,
		message: 'Press run to create a robot'
	};
  
	$scope.createRobot = function() {
		
		myStars();
		
		$scope.state.factoryEmpty = false;
		
		var canvas = document.getElementById('main'),
		context = canvas.getContext('2d');
		
		var x = 150;
		var y = 50;
		
		context.fillStyle = randomColor();
		
		// enemy body
		context.fillRect(x, y, 20, 20);
		
		// enemy arms
		context.fillRect(x+20, y+2, 6, 4);
		context.fillRect(x-6, y+2, 6, 4);
		context.fillRect(x+22, y+4, 4, 10);
		context.fillRect(x-6, y+4, 4, 10);
	
		// enemy legs
		context.fillRect(x+2, y+25, 4, 15);
		context.fillRect(x+15, y+25, 4, 15);
		context.fillRect(x+2, y+2, 14, 4)
	
		// enemy eye - use for easier modes
		context.clearRect(x+2, y+2, 14, 4);
		context.fillStyle = 'rgb(255, 0, 0)';
		context.fillRect(x+6, y+2, 6, 4);

		function randomColor() {
			for (var n = 0; n < 1; n ++) {
				var letters = '0123456789ABCDEF'.split('');
				var color = '#';
					for (var i = 0; i < 6; i++ ) {
						color += letters[Math.round(Math.random() * 15)];
					}
			} 
			return color;
		};
		
		function randomName() {
			var names = ['CHAPPiE','R2D2','C3P0','BENDER','IG-88','AVA','4LOM','PROTEUS','JOHNNY','B.O.B.','V.I.CENT','PRIS','ROY','LEON','Zhora', 'T-800', 'BISHOP', 'OPTIMUS','MARVIN'];
			return name = names[Math.floor(Math.random() * names.length)];
		};
		
		function setGeneration() {
			var generation = Math.floor(Math.random() * 8);
			return generation;
		};
		
		function setId() {
			var ids = Robots.all();
			return id = ids.length + 1;
		}
		
		$scope.robot = {
			id: setId(),
		 	name: randomName(),
			generation: setGeneration(),
		    color: randomColor(),
			speed: setGeneration(),
			armor: setGeneration(),
			power: setGeneration()
		};
		
		$scope.robot = this.robot;
		$scope.state.message = $scope.robot.name + ' ' + $scope.robot.generation + ' ' + 'created!';
	};
	
	// star field
	/* Randomly generated star field by Chuck Leone
	/* Use as you like, please credit me if you do
	/* email: chuckleone@gmail.com
	/* twitter @ChuckLeone 
	*/ 
	
	var canvas = document.getElementById('main'),
	context = canvas.getContext('2d');
	
	var myStars = function(){
		
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (i=1; i<=60;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(255, 255, 255)'; // white
			context.fillRect(x, y, 1, 1);
		};
		
		for (i=1; i<=40;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(80, 80, 80)'; // grey
			context.fillRect(x, y, 1, 1);
		};
		
		for (i=1; i<=10;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(255, 100, 100)'; // red
			context.fillRect(x, y, 1, 1);
		};
		
		for (i=1; i<=10;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(86, 171, 255)'; // blue
			context.fillRect(x, y, 1, 1);
		};
		
		for (i=1; i<=10;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'green'; // green
			context.fillRect(x, y, 2, 2);
		};
		
		for (i=1; i<=5;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(255, 255, 255)'; //white
			context.fillRect(x, y, 2, 2);
		}
		// build a planet
		for (i=1; i<=1;  i++) {	
			var rndX = Math.floor((Math.random()*640) +1);
			var rndY = Math.floor((Math.random()*480) +1);
			x = rndX;
			y = rndY;
			context.fillStyle = 'rgb(155, 255, 251)'; // mint green
			context.fillRect(x, y, 4, 4);
			context.fillRect(x+1, y-1, 1, 1);
			context.fillRect(x+2, y-1, 1, 1);
			context.fillRect(x+4, y+2, 1, 1);
			context.fillRect(x-1, y+1, 1, 1);
			context.fillRect(x-1, y+2, 1, 1);
			context.fillRect(x+1, y+4, 1, 1);
			context.fillRect(x+2, y+4, 1, 1);
			context.fillRect(x+4, y+1, 1, 1);
			context.fillRect(x+4, y+2, 1, 1);
		}
		return;
	};
  // end star field
})

.controller('WarehouseCtrl', function($scope, Robots) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.robots = Robots.all();
  $scope.remove = function(robot) {
    Robots.remove(robot);
  };
})

.controller('RobotDetailCtrl', function($scope, $stateParams, Robots) {
  $scope.robot = Robots.get($stateParams.robotId);
  
  var canvas = document.getElementById('detail'),
  context = canvas.getContext('2d');
		
		var x = 150;
		var y = 50;
		context.fillStyle = 'rgb(255, 255, 255)';
		context.fillRect(x, y, 1, 1);
})

.controller('LabCtrl', function($scope) {
  $scope.settings = {
    theme: false
  };
  $scope.enableTheme = function(){
	  if ($scope.settings.theme) {
		  var elements = document.getElementsByClassName("pane")
        	for (var i = 0; i < elements.length; i++) {
            	elements[i].style.backgroundImage='url("img/ti-80.jpg")';
        	}
	  } else {
		   var elements = document.getElementsByClassName("pane")
        	for (var i = 0; i < elements.length; i++) {
            	elements[i].style.backgroundImage='url("img/cabinet-wood.jpg")';
        	}
	  }
  }
});
