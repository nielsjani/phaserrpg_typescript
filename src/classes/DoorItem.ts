namespace Classes {
    import GameState = States.GameState;
    export class DoorItem implements Classes.Item{
        constructor(public x:number, public y:number, public sprite: string, public map: string, public playerx: number, public playery: number, public tileset: string) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
            this.map = map;
            this.playerx = playerx;
            this.playery = playery;
            this.tileset = tileset;
        }

        getCustomProperties() {
            return {
                map: this.map,
                tileset: this.tileset,
                collides: false,
                playerx: this.playerx,
                playery: this.playery,
                handleOverlap: this.handleOverlap
            }
        }

        handleOverlap(state: GameState){
            state.game.state.start("GameState", true, false, this.map, this.tileset);
        }
    }
}