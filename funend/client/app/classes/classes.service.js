'use strict';

angular.module('albertApp')
  .factory('classes', ['$http', function ($http) {
    var url = 'https://sis-int.nyu.edu/PSIGW/RESTListeningConnector/SSR_GET_CLASSES_R.v1/classes/get?type=complete&languageCd=eng';

    var e = {

    };
  //   var o = {
  //   images: []
  // };
  e.sendContent = function(content){
    return $http.post('#URL', content).success(function(){

    });
  };
  e.xml = function(subject, code){
    var req = {
     method: 'POST',
     url: url,
     dataType: 'xml',
     headers: {
       'Content-Type': 'application/xml'
     },
     data: '<?xml version="1.0"?><SSR_GET_CLASSES_REQ><CLASS_SEARCH_REQUEST><type>complete</type><languageCd>eng</languageCd><STRM>1154</STRM><SUBJECT>' + subject + '</SUBJECT><INSTITUTION>NYUNV</INSTITUTION><CAMPUS>WS</CAMPUS><ACAD_CAREER>UGRD</ACAD_CAREER><SSR_EXACT_MATCH1>E</SSR_EXACT_MATCH1><CATALOG_NBR>'+ code + '</CATALOG_NBR></CLASS_SEARCH_REQUEST></SSR_GET_CLASSES_REQ>'
    };

    return $http(req);
  };



  // o.getAll = function() {
  //   return $http.get('/api/images').success(function(data) {
  //     angular.copy(data, o.images);
  //   });
  // };
  // o.getLive = function() {
  //   return $http.get('/api/images/live').success(function(data){
  //     angular.copy(data, o.images);
  //   });
  // };
  // o.create = function(images){
  //   return $http.post('/api/images', images).success(function(data){
  //     o.images.push(data);
  //   });
  // };
  // o.update = function(id, image){
  //   return $http.post('/api/images/update/'+ id, image).success(function(data){
  //     o.images = o.images.filter(function(item){
  //       return item._id !== id;
  //     });
  //     o.images.push(data);
  //   });
  // };
  // o.toggleLive = function(image, status){
  //   return $http.post('api/images/' + image._id + '/live', status).success(function(){
  //     image.update = status.status;
  //   });
  // };
  // o.view = function(image){
  //   return $http.put('/api/images/view/' + image._id, null).success(function(){
  //     image.views += 1;
  //   });
  // };
  // o.delete = function(id){
  //   return $http.delete('/api/images/' + id).success(function(){
  //     o.images = o.images.filter(function(item){
  //       return item._id !== id;
  //     });
  //     return true;
  //   });
  // };
  return e;
  }]);
