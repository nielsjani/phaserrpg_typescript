export default $urlRouterProvider => {
    "ngInject";
    $urlRouterProvider.otherwise($injector => {
        const $state = $injector.get("$state");
        $state.go("welcome");
    });
};
