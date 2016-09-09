angular.module('app_twentyOne.controllers', [])

//docs & tools
.controller('foodListController', function($scope){
    $scope.toggleSearch = false;

      $scope.greenFood = [
          { "food":"Kale", "prep":"cooked or raw"},
          { "food":"Collard greens", "prep":"cooked or raw" }, 
          { "food":"Spinach", "prep":"cooked or raw" }, 
          { "food":"Brussels sprouts", "prep":"chopped or 5 medium" }, 
          { "food":"Brocolli", "prep":"chopped" }, 
          { "food":"Asparagus", "prep":"10 large spears" }, 
          { "food":"Beets", "prep":"2 medium" },
          { "food":"Tomatoes", "prep":"chopped, cherry, or 2 medium" }, 
          { "food":"Squash (summer)", "prep":"sliced" }, 
          { "food":"Winter squash (all varieties)", "prep":"cubed" }, 
          { "food":"String Beans", "prep":"" }, 
          { "food":"Peppers", "prep":"sweet, sliced" }, 
          { "food":"Carrots", "prep":"sliced, or 10 medium baby" }, 
          { "food":"Cauliflower", "prep":"chopped" }, 
          { "food":"Artichokes", "prep":"1/2 large" }, 
          { "food":"Eggplant", "prep":"1/2 medium" }, 
          { "food":"Okra", "prep":"" }, 
          { "food":"Jicama", "prep":"sliced" }, 
          { "food":"Snow peas", "prep":"" }, 
          { "food":"Cabbage", "prep":"chopped" }, 
          { "food":"Cucumbers", "prep":"" }, 
          { "food":"Celery", "prep":"" }, 
          { "food":"Lettuce", "prep":"NOT iceberg" }, 
          { "food":"Mushrooms", "prep":"" }, 
          { "food":"Radishes", "prep":"" }, 
          { "food":"Onions", "prep":"chopped" }, 
          { "food":"Sprouts", "prep":"" },
      ];
      
      $scope.purpleFood = [
          { "food":"brocolli" },
          { "food":"chicken" }, 
          { "food":"apples" }, 
          { "food":"bananas" }, 
          { "food":"noodles" }, 
          { "food":"oranges" }, 
          { "food": "cookies" },
          { "food":"olive oil" }
      ];
})

.controller('calorieTableController', function($scope, $window){
   
    $scope.$on('$ionicView.enter', function(){
        calculateCalorieColumn($window.localStorage['profile.calorieLevel'] !== 'undefined' ? $window.localStorage['profile.calorieLevel'] : 0); 
    });
    
    function calculateCalorieColumn(cLevel){
        
        if(cLevel < 1500)
            $scope.calorieColumn = 1;
        else if(cLevel < 1800)
            $scope.calorieColumn = 2;
        else if(cLevel < 2100)
            $scope.calorieColumn = 3;
        else if(cLevel >= 2100)
            $scope.calorieColumn = 4;
        else
            $scope.calorieColumn = 0;
    }
    /*
    $scope.caloriePieChartOptions = {  
        chart: {
            type: 'pieChart',
            height: 400,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            color: ['green', 'purple', 'red', 'yellow', 'blue', 'orange', 'gray'],
            legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
                }
            }
        }
    };
    
    $scope.caloriePieChartData = [  
        { key: 'Green',  y: 5 },
        { key: 'Purple', y: 3 },
        { key: 'Red', y: 5 },
        { key: 'Yellow', y: 4 },
        { key: 'Blue', y: 1 },
        { key: 'Orange', y: 1 },
        { key: 'Spoon', y: 5 }
    ];
    */
})

//tracker
.controller('dailyController', function($scope){
    
})

.controller('mealController', function($scope){
    
    loadMealData();
    setForm();
    
    function setForm()
    {
        $scope.meal = {};
        $scope.meal.date = new Date();
    }
    
    function loadMealData()
    {
        $scope.data = [];
        return $scope.data;
    }
    
    $scope.addMeal = function(){
        $scope.data.push($scope.meal); 
        console.log($scope.data);
        setForm();
        
        //$scope.meal.container = '';
        //$scope.meal.food = '';
    }
    
    $scope.loadMeal = function(){
        console.log('loaded meal');
    }
    
    //complex object returned when submitting date
    /*
    {
      meal1:[
          {'container': '', 'food':'},
          {'container': '', 'food':'},
          {'container': '', 'food':'},
          {'container': '', 'food':'}
      ],
      meal2:[
          {'container': '', 'food':'},
          {'container': '', 'food':'},
          {'container': '', 'food':'}
      ]
    }
    
    or simple object
    [
        {'date':'', 'meal':'', 'container':'', 'food':''},
        {'date':'', 'meal':'', 'container':'', 'food':''},
        {'date':'', 'meal':'', 'container':'', 'food':''},
        {'date':'', 'meal':'', 'container':'', 'food':''}
    ]
    */
})

//user
.controller('userCtrl', function(){
    var vm = this;
})

.controller('chartController', function($scope){
    $scope.userChartOptions = {};
    $scope.userChartData = {};
})

.controller('dataController', function($scope, $ionicTabsDelegate){
    var vm = this;

    //init data
    vm.testData = [
        {"date":"05/01/2016", "weight":219},  
        {"date":"05/02/2016", "weight":219}, 
        {"date":"05/03/2016", "weight":218}, 
        {"date":"05/04/2016", "weight":217}, 
        {"date":"05/05/2016", "weight":215}
    ];
    
    //init view
    vm.userForm = {};
    vm.success = 'Nothing added';

    vm.addWeight = addWeight;

    vm.goBack = goBack;
    vm.goForward = goForward;

    function goBack(){
        var selected = $ionicTabsDelegate.selectedIndex();
        console.log('back:selected', selected);
        if(selected != -1 && selected != 0){
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    function goForward(){
        var selected = $ionicTabsDelegate.selectedIndex();
        console.log('forward:selected', selected);
        if(selected != -1 ){
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    defaultDate();
    
    function defaultDate()
    {
        vm.userForm.Date = new Date();
    }
    
    function hasValue (obj, value) {
        for(var id in obj) {
            if(obj[id].Weight == value) {
                return true;
            }
        }
        return false;
    }
    
    function addWeight(){
        //check to see if entry for submitted date already exist 
        if(!hasValue(vm.data, vm.userForm.Date))
        {
            vm.testData.push({"date":vm.userForm.Date, "weight":vm.userForm.Weight});
            //vm.success = 'congrats! Total records added : ';
            vm.userForm.Weight = '';
        }
    }

})

.controller('profileController', function($scope, $window, $ionicTabsDelegate){
    var vm = this;

    $scope.profile = {};
    $scope.calorie = {};
    
    if($window.localStorage['profile.name']){
        console.log('Exists')
    }
    else{
        console.log('No saved profile');
    }
    
    vm.goBack = goBack;
    vm.goForward = goForward;

    function goBack(){
        var selected = $ionicTabsDelegate.selectedIndex();
         console.log('back:selected', selected);
        if(selected != -1 && selected != 0){
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    function goForward(){
        var selected = $ionicTabsDelegate.selectedIndex();
        console.log('forward:selected', selected);
        if(selected != -1){
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.$on('$ionicView.enter', function(){
        
    });

    //init value
    $scope.showCalorieTarget = false;
    $scope.showBefore = false;
    $scope.showAfter = false;
    
    $scope.profile.date = new Date();
    
    $scope.saveProfile = function(){
        $scope.calorie.weight = $scope.profile.weight;
        $scope.calorie.baseline = $scope.calorie.weight * 11;
        $scope.calorie.needs = $scope.calorie.baseline + 400;
        $scope.calorie.target = $scope.calorie.needs - 750;
        
        //calorie target calculations
        $scope.calorie.target = ($scope.calorie.target < 1200) ? 1200 : $scope.calorie.target;
        $scope.calorie.target = ($scope.calorie.target > 2300) ? 2300 : $scope.calorie.target;
        $scope.profile.calorieLevel = $scope.calorie.target;
        
        //temporary local storage
        $window.localStorage['profile.name'] = $scope.profile.name;
        $window.localStorage['profile.date'] = $scope.profile.date;
        $window.localStorage['profile.weight'] = $scope.profile.weight;
        $window.localStorage['profile.calorieLevel'] = $scope.profile.calorieLevel;
    }      
});




