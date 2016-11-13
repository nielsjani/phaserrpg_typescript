/// <reference path="../src/classes/items/TextItem.ts" />
/// <reference path="./config/typings/jasmine.d.ts" />
import TextItem = Classes.TextItem;
describe('TextItem', () => {
    it('Should get 5', () => {
        var myList: number[] = [2,3,4,5,6];

        expect(myList.length).toBe(5);
        expect(myList[2]+1).toEqual(5);
    });

    it('Should collide', () => {
        var textItem: TextItem = new TextItem(5,6,"bla", "bli");
        expect(textItem.collides).toBeTruthy();
        expect(textItem.x).toBe(5);
    });

    it('Should have x', () => {

        var textItem: TextItem = new TextItem(5,6,"bla", "bli");
        expect(textItem.x).toBe(5);
    });

    it('Should have y', () => {
        var textItem: TextItem = new TextItem(5,6,"bla", "bli");
        expect(textItem.y).toBe(6);
    });

    it('Should not have z', () => {
        var textItem: TextItem = new TextItem(5,6,"bla", "bli");
        expect(textItem.sprite).toBe("bla");
    });
});