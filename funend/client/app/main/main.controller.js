'use strict';

angular.module('albertApp')
  .controller('MainCtrl', function ($scope, uiCalendarConfig, classes, $compile) {
    $scope.color = ['black', 'red', 'green', 'blue', 'orange'];
    $scope.classes='CSCI-UA 101';
    $scope.baseWeek = 0;
    $scope.currentWeek = 0;
    $scope.numOfWeeks = 1;
    $scope.existing = {weeks: []};
    $scope.loading = false;
    $scope.events = [];
    var num = 0;
    var date = new Date("2015-04-05T04:00:00");
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();



    //0 is monday


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

    // $scope.add = function(){
    //   $scope.addEvent('Core', 0, 0, 12, 30, 14, 30);
    //   uiCalendarConfig.calendars.sized.fullCalendar({height: 20});
    //   uiCalendarConfig.calendars.sized1.fullCalendar({height: 20});
    //   uiCalendarConfig.calendars.sized2.fullCalendar({height: 20});
    //   uiCalendarConfig.calendars.sized3.fullCalendar({height: 20});
    //   classes.getXml();
    // };

    $scope.sendData = function(){
      uiCalendarConfig.calendars.weekly.fullCalendar('removeEvents');
      $scope.existing = [];
      $scope.currentWeek = 0;
      var lines = $scope.classes.split('\n');
      var data = [];
      for(var i = 0; i < lines.length; i++){
        $scope.xml({
          name: lines[i].split(' ')[0],
          number: lines[i].split(' ')[1]
        }, i);
        // data.push({
        //   name: lines[i].split(' ')[0],
        //   number: lines[i].split(' ')[1]
        // });
      }
    };

    $scope.xml = function(input, color){
      $scope.loading = true;
      classes.xml(input.name, input.number).success(function(data){
        var interest = data.SSR_GET_CLASSES_RESP.SEARCH_RESULT.SUBJECTS.SUBJECT;
        var classes = interest.CLASSES_SUMMARY.CLASS_SUMMARY;
        console.log(interest);
        console.log(classes);
        var lects = [];
        var etc = [];
        for(var i = 0; i < classes.length; i++) {
          var days = [];
          var meetings = classes[i].CLASSES_MEETING_PATTERNS.CLASS_MEETING_PATTERN;
          var start = meetings.MEETING_TIME_START.split(':');
          var end = meetings.MEETING_TIME_END.split(':');
          var title = interest.COURSE_TITLE_LONG + ' - ' + meetings.CLASS_SECTION + ' ' + classes[i].SSR_COMPONENT_LOVDescr + ' -- ' + meetings.SSR_INSTR_LONG.split(' ')[1];
          var type = classes[i].SSR_COMPONENT;
          if(meetings.MON === "Y"){
            days.push(0);
          }
          if(meetings.TUES === "Y"){
            days.push(1);
          }
          if(meetings.WED === "Y"){
            days.push(2);
          }
          if(meetings.THURS === "Y"){
            days.push(3);
          }
          if(meetings.FRI === "Y"){
            days.push(4);
          }
          if(meetings.SAT === "Y"){
            days.push(5);
          }
          var obj = {
              title: title,
              days: days,
              hour: start[0],
              startT: new Date("2011-01-01T"+start[0]+":"+start[1]),
              min: start[1],
              endHour: end[0],
              endMin: end[1],
              endT: new Date("2011-01-01T"+end[0]+":"+end[1]),
              color: color,
              type: type
            };
          if (type==="LEC"){
            lects.push(obj);
          }
          else {
            etc.push(obj);
          }
        }
        console.log(lects, etc);
        var possibles = [];
        var weekNum = 0;
        var week = [];
        for(var i = 0; i < lects.length; i++){
          if(etc.length > 0) {
            for(var j = 0; j < etc.length; j++){
              if(etc[j].startT > lects[i].endT || etc[j].endT < lects[i].startT) {
                week.push(lects[i]);
                week.push(etc[j]);
                possibles.push(week);
                weekNum+=1;
                week = [];
              }

            }
          }
          else {
            week.push(lects[i]);
            weekNum += 1;
            possibles.push(week);
            week = [];
          }
        }

        var seperate = $scope.existing;
        $scope.existing = [];

        if(seperate.length > 0) {
          //weeks
          for (var i = 0; i< possibles.length; i++){
            for (var j = 0; j < seperate.length; j++){
              for(var k = 0; k < possibles[i].length; k++){
                for (var l = 0; l < seperate[i].length; l++){
                  console.log(possibles[i][k], seperate[i][l]);
                }
                console.log("exit L");
              }
              console.log("exit week");
            }
            console.log("exit j");
          }
          console.log("exit i");
          for(var i = 0; i < possibles.length; i++){
            $scope.existing.push(possibles[i]);
            for(var j = 0; j<possibles[i].length; j++){
              $scope.addEvent(possibles[i][j].title, i, possibles[i][j].days, possibles[i][j].hour, possibles[i][j].min, possibles[i][j].endHour, possibles[i][j].endMin, 0);
            }
          }
        }
        else{
          for(var i = 0; i < possibles.length; i++){
            $scope.existing.push(possibles[i]);
            for(var j = 0; j<possibles[i].length; j++){
              $scope.addEvent(possibles[i][j].title, i, possibles[i][j].days, possibles[i][j].hour, possibles[i][j].min, possibles[i][j].endHour, possibles[i][j].endMin, 0);
            }
          }
        }
        $scope.events = [];
        $scope.addEvent
        $scope.numOfWeeks = weekNum;

        $scope.loading = false;
        for (var i = 0; i < $scope.events.length; i++){
          uiCalendarConfig.calendars.weekly.fullCalendar( 'renderEvent', $scope.events[i], true);
        }
        // $scope.eventSources = [$scope.events];
        console.log("done promise",$scope.eventSources, $scope.events);
      });
    };

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

    $scope.objectify = function(title, week, days, hour, minute, endHour, endMin, color, type) {
      var returnObjs = []
      for (var i = 0; i < days.length; i++){
        var day = days[i]
        returnObjs.push({
          title: title,
          start: new Date(y, m, d + 1 + day + week * 7, hour, minute),
          end: new Date(y, m, d + 1 + day + week * 7, endHour, endMin),
          allDay: false,
          color: $scope.color[color]
        });
      }
    };

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
