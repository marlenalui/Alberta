'use strict';

angular.module('albertApp')
  .controller('MainCtrl', function ($scope, uiCalendarConfig, classes) {
    $scope.classes='hello';
    var num = 0;
    var date = new Date("2015-04-05T04:00:00");
    console.log(date);
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    console.log(new Date(y,m ,d + 1, 12, 0));
    console.log(new Date(y,m ,d + 4, 12, 0));

    $scope.events = [
      {id: '01', title: 'CSCI-UA 102 - 006',start: new Date(y, m, d + 1 + num, 9, 30),end: new Date(y, m, d + 1, 10, 45),allDay: false, color: "black"},
      {id: '01', title: 'CSCI-UA 102 - 006',start: new Date(y, m, d + 3 + num, 9, 30),end: new Date(y, m, d + 3, 10, 45),allDay: false, color: "black"},
      {id: '02', title: 'CORE-UA 509 - 001',start: new Date(y, m, d + 1 + num, 12, 30),end: new Date(y, m, d + 1, 13, 45),allDay: false, color: "blue"},
      {id: '02', title: 'CORE-UA 509 - 001',start: new Date(y, m, d + 3 + num, 12, 30),end: new Date(y, m, d + 3, 13, 45),allDay: false, color: "blue"},
      {id: '03', title: 'MATH-UA 120 - 004',start: new Date(y, m, d + 2 + num, 8, 55),end: new Date(y, m, d + 2, 10, 45),allDay: false, color: "green"},
      {id: '03', title: 'MATH-UA 120 - 004',start: new Date(y, m, d + 4 + num, 8, 55),end: new Date(y, m, d + 4, 10, 45),allDay: false, color: "green"},
      {id: '04', title: 'CORE-UA 509 - 004',start: new Date(y, m, d + 2 + num, 11, 0),end: new Date(y, m, d + 2, 12, 15),allDay: false, color: "red"},
      {id: '05', title: 'CSCI-UA 102 - 007, RECT',start: new Date(y, m, d + 2 + num, 12, 30),end: new Date(y, m, d + 2, 13, 45),allDay: false, color: "black"},
      {id: '06', title: 'ECON-UA 1 - 008',start: new Date(y, m, d + 2 + num, 15, 30),end: new Date(y, m, d + 2, 16, 45),allDay: false, color: "red"},
      {id: '06', title: 'ECON-UA 1 - 008',start: new Date(y, m, d + 4 + num, 15, 30),end: new Date(y, m, d + 4, 16, 45),allDay: false, color: "red"},
      {id: '07', title: 'ECON-UA 1 - 011, RECT',start: new Date(y, m, d + 3 + num, 15, 30),end: new Date(y, m, d + 3, 16, 45),allDay: false, color: "red"}
    ];
    $scope.other = [
      {id: '08', title: 'CSCI-UA 102 - 006',start: new Date(y, m, d + 1 + 7, 9, 30),end: new Date(y, m, d + 1 + 7, 10, 45),allDay: false, color: "black"},
      {id: '08', title: 'CSCI-UA 102 - 006',start: new Date(y, m, d + 3 + 7, 9, 30),end: new Date(y, m, d + 3 + 7, 10, 45),allDay: false, color: "black"},
      {id: '09', title: 'CORE-UA 509 - 001',start: new Date(y, m, d + 1 + 7, 12, 30),end: new Date(y, m, d + 1 + 7, 13, 45),allDay: false, color: "blue"},
      {id: '09', title: 'CORE-UA 509 - 001',start: new Date(y, m, d + 3 + 7, 12, 30),end: new Date(y, m, d + 3 + 7, 13, 45),allDay: false, color: "blue"},
      {id: '10', title: 'MATH-UA 120 - 004',start: new Date(y, m, d + 2 + 7, 8, 55),end: new Date(y, m, d + 2 + 7, 10, 45),allDay: false, color: "green"},
      {id: '10', title: 'MATH-UA 120 - 004',start: new Date(y, m, d + 4 + 7, 8, 55),end: new Date(y, m, d + 4 + 7, 10, 45),allDay: false, color: "green"},
      {id: '11', title: 'CORE-UA 509 - 004',start: new Date(y, m, d + 2 + 7, 11, 0),end: new Date(y, m, d + 2 + 7, 12, 15),allDay: false, color: "red"},
      {id: '12', title: 'CSCI-UA 102 - 007, RECT',start: new Date(y, m, d + 5 + 7, 12, 30),end: new Date(y, m, d + 2 + 7, 13, 45),allDay: false, color: "black"},
      {id: '13', title: 'ECON-UA 1 - 008',start: new Date(y, m, d + 2 + 7, 15, 30),end: new Date(y, m, d + 2 + 7, 16, 45),allDay: false, color: "red"},
      {id: '13', title: 'ECON-UA 1 - 008',start: new Date(y, m, d + 4 + 7, 15, 30),end: new Date(y, m, d + 4 + 7, 16, 45),allDay: false, color: "red"},
      {id: '14', title: 'ECON-UA 1 - 011, RECT',start: new Date(y, m, d + 3 + 7, 15, 30),end: new Date(y, m, d + 3 + 7, 16, 45),allDay: false, color: "red"}
    ];

    //0 is monday
    $scope.addEvent = function(title, week, day, hour, minute, endHour, endMin) {
      $scope.events.push({
        title: title,
        start: new Date(y, m, d + 1 + day, hour, minute),
        end: new Date(y, m, d + 1 + day, endHour, endMin),
        allDay: false,
        color: "black"
      });
    };

    $scope.sendData = function(){
      var lines = $scope.classes.split('\n');
      var data = [];
      for(var i = 0; i < lines.length; i++){
        data.push({
          name: lines[i].split(' ')[0],
          number: lines[i].split(' ')[1]
        });
      }
      console.log(data);
      classes.sendContent(data);
    };

    $scope.eventSources =[$scope.events, $scope.other];

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
          right: 'prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };





  });
