///<reference path="../enemies/Enemy.ts"/>

import {Enemy} from "../enemies/Enemy";
export class NotificationTextService {

    battleStartText(possibleEnemies: Enemy[]): string {
        return "You were attacked by" + this.parseEnemyNames(possibleEnemies);
    }

    private parseEnemyNames(possibleEnemies: Enemy[]) {
        let namesAndOccurences = this.calculateNumberOfOccurancesOfPerEnemy(possibleEnemies);
        let result: string[] = [];
        namesAndOccurences.forEach((value, key) => result.push(this.enemyLine(value, key)));

        return result.join(" and");
    }

    private calculateNumberOfOccurancesOfPerEnemy(possibleEnemies: Enemy[]) {
        let namesAndOccurences: Map<string, number> = new Map();
        possibleEnemies.forEach(enemy => {
            if (namesAndOccurences.has(enemy.getName())) {
                namesAndOccurences.set(enemy.getName(), namesAndOccurences.get(enemy.getName()) + 1)
            } else {
                namesAndOccurences.set(enemy.getName(), 1);
            }
        });
        return namesAndOccurences;
    }

    private enemyLine(numberOfEnemiesWithName: number, enemyName: string) {
        if (numberOfEnemiesWithName === 1) {
            return " one " + enemyName;
        }
        return " " + numberOfEnemiesWithName + " " + enemyName;
    }

    playerAttacksText(attackName: string, targetEnemy: Enemy) {
        return `You attacked ${targetEnemy.getName()} with ${attackName}`;
    }
}
