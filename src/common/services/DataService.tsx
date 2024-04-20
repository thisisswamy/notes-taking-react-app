export class DataService{
    private static context:any ={};

    set(key:string,value:any){
        DataService.context[key] =value;
    }
    get(key:string){
        return DataService.context[key]
    }
}