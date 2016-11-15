///<reference path="../../states/GameState.ts"/>
///<reference path="../items/Item.ts"/>
///<reference path="../items/DoorItem.ts"/>
///<reference path="../items/EncounterTrigger.ts"/>

namespace Classes.Util {
    import GameState = States.GameState

    export class MapCreator {
        constructor() {
        }

        createMap(state:GameState) {
            state.map = state.add.tilemap(state.mapname);
            state.map.addTilesetImage(state.tileset, state.tileset);
            state.groundLayer = state.map.createLayer("groundlayer");
            state.collisionLayer = state.map.createLayer("collisionlayer");
            this.addItems(state);
            state.map.setCollisionBetween(1, 100000, true, 'collisionlayer');

            state.groundLayer.resizeWorld();
            state.collisionLayer.resizeWorld();
        }

        addItems(state:GameState) {
            state.items = state.add.group();
            state.items.enableBody = true;
            let itemsFromJson = this.getItems(state);
            itemsFromJson.forEach((item:Classes.Item) => {
                this.addToGroup(item, state.items);
            })
        }

        getItems(state:GameState) {
            let items:Classes.Item[] = [];
            state.map.objects["itemlayer"].forEach((item:any) => {
                if (item.properties.type === "text") {
                    items.push(new TextItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.text));
                }
                if (item.properties.type === "door") {
                    items.push(new DoorItem(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.map, item.properties.x, item.properties.y, item.properties.tileset));
                }
                if (item.properties.type === "encounter") {
                    items.push(new EncounterTrigger(item.x, (item.y - state.map.tileHeight), item.properties.sprite, item.properties.possibleEnemies.split(","), item.properties.encounterRate, item.properties.widthInTiles, item.properties.heightInTiles));
                }
            });
            return items;
        }

        addToGroup(item:Classes.Item, group:Phaser.Group) {
            let sprite = group.create(item.x, item.y, item.sprite);
            //TODO: elk item een 'createSprite' methode geven + default implementatie op superclass?
            if(item instanceof EncounterTrigger) {
                sprite.width = sprite.width * item.widthInTiles;
                sprite.height = sprite.height * item.heightInTiles;
            }
            //TODO: Add whole item as a property to sprite
            sprite.customProperties = item.getCustomProperties();
            sprite.body.immovable = sprite.customProperties.collides;
        }
    }
}