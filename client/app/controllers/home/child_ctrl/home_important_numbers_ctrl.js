'use strict';

app.controller('ImportantNumbersCtrl', function($scope, $http,
    RootFactory, apiUrl, profile, partner, numbers) {

    // logged in user
    $scope.profile = profile;
    $scope.numbers = numbers;

    // their partner
    $scope.partner = partner;
    $scope.partner_numbers = partner.numbers;

    // the list of numbers is closed by default
    $scope.status = { isFirstOpen: false };

    // Remove a name/number from the contact list
    $scope.removeContact = (id) => {
        $http({
            url: `${apiUrl}/numbers/` + id + '/',
            method: 'DELETE',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() }
        }).then(() => {

            $http({
                url: `${apiUrl}/numbers/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_numbers) => {
                updated_numbers = updated_numbers.data.results;
                $scope.numbers = updated_numbers;
            });

        });
    };

    // add a name/number to the contact list
    $scope.addContact = () => {
        $http({
            url: `${apiUrl}/numbers/`,
            method: 'POST',
            headers: { 
                'Authorization': 'Token ' + RootFactory.getToken() 
            },
            data: { 
                'important_name': $scope.important_name,
                'important_number': $scope.important_number
            }
        }).then((server_response) => {
            $scope.important_name = '';
            $scope.important_number = '';
            
            $http({
                url: `${apiUrl}/numbers/`,
                headers: { 
                    'Authorization': 'Token ' + RootFactory.getToken() 
                },
            })
            .then((updated_numbers) => {
                updated_numbers = updated_numbers.data.results;
                $scope.numbers = updated_numbers;
            });
        }, function(data) {
            console.log('all fields must be filled out');
        });
    };


});