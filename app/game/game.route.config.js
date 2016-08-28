export default $stateProvider => {
    "ngInject";
    $stateProvider.state("game", {
        url: "/game",
        template: "<game></game>"
    });
};
