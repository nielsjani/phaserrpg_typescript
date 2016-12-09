var Classes;
(function (Classes) {
    class Enemy {
        constructor(stats, imageKey) {
            this.stats = stats;
            this.imageKey = imageKey;
        }
        getImageKey() {
            return this.imageKey;
        }
        isPlayerControlled() {
            return false;
        }
        getStats() {
            return this.stats;
        }
    }
    Classes.Enemy = Enemy;
})(Classes || (Classes = {}));
//# sourceMappingURL=Enemy.js.map