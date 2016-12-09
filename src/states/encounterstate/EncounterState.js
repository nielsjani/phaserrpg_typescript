var States;
(function (States) {
    var EncounterStateMenuManager = States.EncounterStateMenuManager;
    var EncounterCharacterBuilder = States.EncounterCharacterBuilder;
    var BattleEngine = Battle.BattleEngine;
    var NotificationTextService = Battle.NotificationTextService;
    class EncounterState extends Phaser.State {
        constructor(...args) {
            super(...args);
            this.notificationTextService = new NotificationTextService();
        }
        init(possibleEnemies, state, player) {
            this.possibleEnemies = possibleEnemies;
            this.state = state;
            this.player = player;
            this.battleEngine = new BattleEngine(this);
        }
        renderBattlefield() {
            this.playerGraphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(290)
                .withY(210)
                .withImageKey("player_backsprite")
                .withImageHeight(165)
                .build();
            this.rat1Graphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(10)
                .withY(5)
                .withImageKey(this.possibleEnemies[0].getImageKey())
                .withImageHeight(180)
                .build();
            this.rat2Graphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(290)
                .withY(5)
                .withImageKey(this.possibleEnemies[0].getImageKey())
                .withImageHeight(180)
                .build();
            this.rat3Graphic = EncounterCharacterBuilder.encounterCharacter()
                .withState(this)
                .withX(570)
                .withY(5)
                .withImageKey(this.possibleEnemies[0].getImageKey())
                .withImageHeight(180)
                .build();
        }
        create() {
            this.encounterStateMenuManager = new EncounterStateMenuManager(this);
            this.encounterStateMenuManager.createBaseMenu(this.useSpecial(this), this.flee);
            this.encounterStateMenuManager.createAttacksMenu();
            this.encounterStateMenuManager.createItemPaginationButtons();
            this.showNotification(this.notificationTextService.battleStartText(this.possibleEnemies));
            this.renderBattlefield();
        }
        update() {
            this.playerGraphic.decrementHealthBarUntil(this.player.playerStats.getPercentHealthRemaining());
        }
        useSpecial(context) {
            return () => {
                console.log("I'm special!");
                context.player.playerStats.currenthealth -= 10;
            };
        }
        flee() {
            this.game.state.start('LoadState', false, false, "mymap1", "MyTileset");
        }
        getPlayerItems(start, end) {
            return this.player.items.slice(start, end);
        }
        getAllPlayerItems() {
            return this.player.items;
        }
        getPlayerStats() {
            return this.player.playerStats;
        }
        getEnemies() {
            return this.possibleEnemies;
        }
        getPlayer() {
            return this.player;
        }
        showNotification(text) {
        }
    }
    States.EncounterState = EncounterState;
})(States || (States = {}));
//# sourceMappingURL=EncounterState.js.map