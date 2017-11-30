(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    $scope.users = [];
    $scope.mynickname = $localStorage.nickName;
    var nickname = $scope.mynickname;
    socket.emit('get-users');
    socket.on('all-users', function (data) {
        console.log("All-users event: ", data);
    })
  };
})();