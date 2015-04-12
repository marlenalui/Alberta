'use strict';

angular.module('albertApp')
  .controller('MainCtrl', function ($scope, uiCalendarConfig, classes) {
    //preconfigured colors
    $scope.color = ['black', 'red', 'green', 'blue', 'orange'];

    $scope.classes='CSCI-UA 101';
    $scope.events = [];

    $scope.baseWeek = 0;
    $scope.currentWeek = 0;
    $scope.numOfWeeks = 1;

    //hidden calendar until data is loaded
    $scope.formOp = {opacity: .0};

    var date = new Date("2015-04-05T04:00:00");
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    //Movement functions

    $scope.canForward = function(){
      if($scope.currentWeek < $scope.numOfWeeks - 1){
        $scope.fore = "";
        return true;
      }
      $scope.fore = "disabled";
      return false;
    };

    $scope.canBackward = function(){
      if($scope.currentWeek > $scope.baseWeek){
        $scope.back = "";
        return true;
      }
      $scope.back = "disabled";
      return false;
    };

    $scope.forward = function(){
      if($scope.canForward()){
        uiCalendarConfig.calendars.weekly.fullCalendar('next');
        $scope.currentWeek += 1;
      }
    };

    $scope.backward = function(){
      if($scope.canBackward()){
        uiCalendarConfig.calendars.weekly.fullCalendar('prev');
        $scope.currentWeek -= 1;
      }
    };

    //data retrieval

    $scope.getData = function(){
      $scope.formOp = {opacity: .4};
      $scope.loading = true;
      uiCalendarConfig.calendars.weekly.fullCalendar('removeEvents');
      classes.example().success(function(data){
        $scope.numOfWeeks = data.length;

        $scope.formOp = {opacity: 1};
        $scope.loading = false;
        for(var i = 0; i < data.length; i++){
          for(var j = 0; j < data[i].schedule.length; j++){
            var obj = data[i].schedule[j];
            console.log(obj);
            var title = obj.name + ' ' + obj.section + ' ' + obj.instructor;
            var hour = obj.startTime.split(':')[0];
            var min = obj.startTime.split(':')[1];
            var endHour = obj.endTime.split(':')[0];
            var endMin = obj.endTime.split(':')[1];



            $scope.addEvent(title, i, obj.days, hour, min, endHour, endMin, $scope.color[i]);
          }
        }
        for (var i = 0; i < $scope.events.length; i++){
          uiCalendarConfig.calendars.weekly.fullCalendar( 'renderEvent', $scope.events[i], true);
        }

      });
    };

    //event control

    $scope.addEvent = function(title, week, days, hour, minute, endHour, endMin, color) {
      for (var i = 0; i < days.length; i++){
        var day = days[i]
        $scope.events.push({
          title: title,
          start: new Date(y, m, d + 1 + day + week * 7, hour, minute),
          end: new Date(y, m, d + 1 + day + week * 7, endHour, endMin),
          allDay: false,
          color: $scope.color[color]
        });
      }
    };

    //calendar configuration
    $scope.eventSources =[$scope.events];
    $scope.uiConfig = {
      calendar:{
        height: 700,
        editable: false,
        year: 2015,
        month: 3,
        date: 5,
        allDaySlot: false,
        defaultView: 'agendaWeek',
        columnFormat: 'dddd',
        minTime: "7:00:00",
        maxTime: "23:00:00",
        header:{
          left: '',
          center: '',
          right: ''
        }
      },
      sized:{
        height: 200,
        aspectRatio: .25,
        editable: false,
        year: 2015,
        month: 3,
        date: 5,
        allDaySlot: false,
        defaultView: 'agendaWeek',
        columnFormat: 'dddd',
        minTime: "7:00:00",
        maxTime: "23:00:00",
        header:{
          left: '',
          center: '',
          right: ''}
      }
    };

  });
