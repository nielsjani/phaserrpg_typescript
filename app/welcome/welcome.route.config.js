export default $stateProvider => {
    "ngInject";
    $stateProvider.state("welcome", {
        url: "/welcome",
        template: "<welcome></welcome>"
    });
};
