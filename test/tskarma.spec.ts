/// <reference path="../src/classes/TextItem.ts" />
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
    });
});