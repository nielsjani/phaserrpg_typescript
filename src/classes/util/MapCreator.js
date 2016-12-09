var Classes;
(function (Classes) {
    var Util;
    (function (Util) {
        class MapCreator {
            constructor() {
            }
            createMap(state) {
                state.map = state.add.tilemap(state.mapname);
                state.map.addTilesetImage(state.tileset, state.tileset);
                state.groundLayer = state.map.createLayer("groundlayer");
                state.collisionLayer = state.map.createLayer("collisionlayer");
                this.addItems(state);
                state.map.setCollisionBetween(1, 100000, true, 'collisionlayer');
                state.groundLayer.resizeWorld();
                state.collisionLayer.resizeWorld();
            }
            addItems(state) {
                state.items = state.add.group();
                state.items.enableBody = true;
                let itemsFromJson = this.getItems(state);
                itemsFromJson.forEach((item) => {
                    this.addToGroup(item, state.items);
                });
            }
            getItems(state) {
                let items = [];
                state.map.objects["itemlayer"].forEach((item) => {
                    if (item.properties.type === "text") {
                        items.push(new Classes.TextItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.text));
                    }
                    if (item.properties.type === "door") {
                        items.push(new Classes.DoorItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.map, item.properties.x, item.properties.y, item.properties.tileset));
                    }
                    if (item.properties.type === "encounter") {
                        items.push(new Classes.EncounterTrigger(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.possibleEnemies.split(","), item.properties.encounterRate, item.properties.widthInTiles, item.properties.heightInTiles));
                    }
                });
                return items;
            }
            addToGroup(item, group) {
                let sprite = group.create(item.x, item.y, item.sprite);
                if (item instanceof Classes.EncounterTrigger) {
                    sprite.width = sprite.width * item.widthInTiles;
                    sprite.height = sprite.height * item.heightInTiles;
                }
                sprite.customProperties = item.getCustomProperties();
                sprite.body.immovable = sprite.customProperties.collides;
            }
        }
        Util.MapCreator = MapCreator;
    })(Util = Classes.Util || (Classes.Util = {}));
})(Classes || (Classes = {}));
//# sourceMappingURL=MapCreator.js.map