export class ObjectAmountMap {

    private oaMap:Map<any, number>= new Map();

    constructor(private equalsFunction: any){}

    set(key: any, value: number){
        if(this.has(key)){
            this.oaMap.set(this.getRealKey(key), value);
        } else {
            this.oaMap.set(key, value);
        }
    }

    has(key: any){
        return this.getRealKey(key) !== undefined;
    }

    get(key: any) {
        let realKey = this.getRealKey(key);
        if(realKey){
            return this.oaMap.get(realKey);
        }
        return undefined;
    }

    private getRealKey(key: any) {
        return Array.from(this.oaMap.keys()).filter(oaItem => this.equalsFunction(oaItem, key))[0];
    }

    getAll() {
        return this.oaMap;
    }

    remove(item: any) {
        this.oaMap.delete(this.getRealKey(item));
    }
}