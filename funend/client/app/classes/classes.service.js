'use strict';

angular.module('albertApp')
  .factory('classes', ['$http', function ($http) {

    var e = {
      combos: []
    };

  e.example = function(){
    return $http.get('app/example.json').success(function(data){
      console.log("success");
    });
  };
  
  //lookup Angular JS $Http and match my example above

  return e;
  }]);
