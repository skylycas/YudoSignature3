// JQuery Begins------------------------------
$(document).ready(function () {

    $('#imagelistDiv1').hover(function () {
        $('.imagecaption', this).slideToggle('slow');
    }, function () {
        $('.imagecaption', this).slideToggle('slow');
    });
    $('#imagelistDiv2').hover(function () {
        $('.imagecaption', this).slideToggle('slow');
    }, function () {
        $('.imagecaption', this).slideToggle('slow');
    });
    $('#imagelistDiv3').hover(function () {
        $('.imagecaption', this).slideToggle('slow');
    }, function () {
        $('.imagecaption', this).slideToggle('slow');
    });
});

// JQuery Ends------------------------------


// Angular Begins-----------------------------------
var app = angular.module('myClothes', ['ngCookies', 'ui.bootstrap']);
app.controller('clothesController', ['$scope', '$cookies', function ($scope, $cookies, $modal) {

    $scope.clothes = [
        { id: 1, name: 'Black Pant', imgname: 'cloth1.png', price: 150.50, quantity: 1 },
        { id: 2, name: 'Red Collar Top', imgname: 'cloth2.png', price: 244.99, quantity: 1 },
        { id: 3, name: 'Red Dress', imgname: 'cloth3.png', price: 179.99, quantity: 1 },
        { id: 4, name: 'Black Collarless', imgname: 'cloth4.png', price: 220.50, quantity: 1 },
        { id: 5, name: 'Red Roundneck', imgname: 'cloth5.png', price: 309.99, quantity: 1 },
        { id: 6, name: 'Black Roundneck', imgname: 'cloth6.png', price: 255.50, quantity: 1 },
        { id: 7, name: 'Red Black Roundneck', imgname: 'cloth2.png', price: 159.99, quantity: 1 },
    ]
    $scope.cart = [];
    $scope.total = 0;

    if (!angular.isUndefined($cookies.get('total'))) {
        $scope.total = parseFloat($cookies.get('total'));
    }
    if (!angular.isUndefined($cookies.get('cart'))) {
        $scope.cart = $cookies.getObject('cart');
    }

    // Add item to Cart
    $scope.addItemtoCart = function (clothing) {
        if ($scope.cart.length === 0) {
            clothing.count = clothing.quantity;
            $scope.cart.push(clothing);
        }
        else {
            var repeat = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].id === clothing.id) {

                    // //check if the new quantity is less than the existing quantit, if it is less than the existing quantity call the remove function
                    // if ($scope.cart[i].count > clothing.quantity) {
                        
                    //     var index = $scope.cart.indexOf(clothing);
                    //     $scope.cart.splice(index, i);

                    //     var expireDate = new Date();
                    //     expireDate.setDate(expireDate.getDate() + 1);
                    //     $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                    //     $scope.cart = $cookies.getObject('cart');

                    //     $scope.total -= parseFloat($scope.cart[i].price * $scope.cart[i].count);
                    //     $cookies.put('total', $scope.total, { 'expires': expireDate });

                    //     // clothing.count = clothing.quantity;
                    //     // $scope.cart.push(clothing);
                    //     repeat = true;
                    // }
                    // else
                    // {
                    //     repeat = true;
                    //     $scope.cart[i].count += clothing.quantity;
                    // }

                    repeat = true;
                    $scope.cart[i].count += clothing.quantity;
                   
                }
            }

            if (!repeat) {
                clothing.count = clothing.quantity;
                $scope.cart.push(clothing);
            }
        }


        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
        $scope.cart = $cookies.getObject('cart');

        $scope.total += parseFloat(clothing.price * clothing.quantity);
        $cookies.put('total', $scope.total, { 'expires': expireDate });

        $scope.clothingItemForDialog = clothing;
    }

    // remove item from cart
    $scope.removeItemFromCart = function (itemtoRemove) {
        var index = $scope.cart.indexOf(itemtoRemove);
        $scope.cart.splice(index, 1);

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
        $scope.cart = $cookies.getObject('cart');

        $scope.total -= parseFloat(itemtoRemove.price * itemtoRemove.count);
        $cookies.put('total', $scope.total, { 'expires': expireDate });
    }

    // Clear Cart
    $scope.clearCart = function () {
        $scope.cart.length = 0;

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
        $scope.cart = $cookies.getObject('cart');

        $scope.total = 0;
        $cookies.put('total', $scope.total, { 'expires': expireDate });
    };

    // $scope.addItemtoCart = function(clothing){     
    //   $scope.value = clothing.name;     
    // }    

    // $scope.open = function (clothingItem) {
    //     var modalInstance = $uibModal.open({
    //         templateUrl: "modalContent.html",
    //         controller: "ModalContentCtrl",
    //         size: '',
    //         resolve: {
    //             clothingItem2: function () {
    //                 return clothingItem;
    //             }
    //         }
    //     });

    //     // modalInstance.result.then(function (response) {
    //     //     $scope.result = `${response} button hitted`;
    //     // });

    // };
    // $scope.open = function() {
    //     var modalInstance =  $modal.open({
    //       templateUrl: "modalContent.html",
    //       controller: "ModalContentCtrl",
    //       size: '',
    //     });

    //     modalInstance.result.then(function(response){
    //         $scope.result = `${response} button hitted`;
    //     });

    //   };


}]);


// var app = angular.module('plunker', ['ui.bootstrap']);

// app.controller('clothesController', function($scope, $uibModal) {


// })

// app.controller('ModalContentCtrl', function($scope, $modalInstance) {

//   $scope.ok = function(){
//     $modalInstance.close("Ok");
//   }

//   $scope.cancel = function(){
//     $modalInstance.dismiss();
//   } 

// });


// app.controller('ModalContentCtrl', function ($scope, $uibModalInstance, clothingItem2) {
//     $scope.clothingItemReturned = clothingItem2;

//     $scope.ok = function () {
//         $uibModalInstance.close("Ok");
//     }

//     $scope.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     }

// });
// Another angula


// angular.module('myClothes').controller('PopupController1', ['$scope', '$modal', function ($scope, $modal) {
//     $scope.open = function (clothingItem) {
//         var modalInstance = $modal.open({
//             templateUrl: 'Popup.html',
//             controller: 'PopupController2',
//             resolve: {
//                 clothingItem2: function () {
//                     return clothingItem;
//                 }
//             }
//         });
//     }
// }]);

// angular.module('myClothes').controller('PopupController2', function ($scope, $modalInstance, clothingItem2) {
//     $scope.obj = clothingItem2;
//     $scope.close = function () {
//         $modalInstance.dismiss('cancel');
//     };
// });


// Angular Ends-------------------------------------