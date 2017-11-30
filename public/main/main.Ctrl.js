(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    $scope.users = [];
    $scope.message = '';
    $scope.messages = [];
    $scope.mynickname = $localStorage.nickName;
    var nickname = $scope.mynickname;
    socket.emit('get-users');
    socket.on('all-users', function (data) {
        console.log("All-users event: ", data);
        $scope.users = data.filter(function (item) {
            return item.nickname != nickname;
        })
    })

    socket.on('message-received', function (data) {
        $scope.messages.push(data);
    })
    $scope.sendMessage = function (data) {
        var newMesssage = {
            message: $scope.message,
            from: $scope.mynickname
        };
        socket.emit('send-message', newMesssage);
        $scope.message = '';
        $scope.messages.push(newMesssage);
    }
  };
})();