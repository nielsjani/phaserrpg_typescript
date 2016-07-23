///<reference path="../../states/GameState.ts"/>
var Classes;
(function (Classes) {
    var Util;
    (function (Util) {
        var MapCreator = (function () {
            function MapCreator() {
            }
            MapCreator.prototype.createMap = function (state) {
                state.map = state.add.tilemap(state.mapname);
                state.map.addTilesetImage(state.tileset, state.tileset);
                state.groundLayer = state.map.createLayer("groundlayer");
                state.collisionLayer = state.map.createLayer("collisionlayer");
                //this.addItems(state);
                state.map.setCollisionBetween(1, 100000, true, 'collisionlayer');
                state.groundLayer.setScale(3);
                state.collisionLayer.setScale(3);
                state.groundLayer.resizeWorld();
                state.collisionLayer.resizeWorld();
            };
            return MapCreator;
        })();
        Util.MapCreator = MapCreator;
    })(Util = Classes.Util || (Classes.Util = {}));
})(Classes || (Classes = {}));
//# sourceMappingURL=MapCreator.js.map