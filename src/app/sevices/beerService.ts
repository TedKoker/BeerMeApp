import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BeerDate } from '../models/beerData';
import { AutoComplete } from '../models/autoComplete';

@Injectable()
export class BeerService{

    private sourceUrl: string ="https://api.openbrewerydb.org/breweries/";
    private beerDataList: BeerDate[];
    private autoComplete: AutoComplete[];

    hideEvent = new EventEmitter<BeerDate>();
    searchEvent = new EventEmitter<{beerlist:BeerDate[], message:string}>();
    autoCompleteEvent = new EventEmitter<AutoComplete>();

    constructor(private httpClient: HttpClient){}
    
    searchBeer(q:string){
        //this.beerDataList=null;
        this.searchEvent.emit({beerlist: this.beerDataList, message: "enter"}); //it says that it's enter
        let endPoint: string =this.sourceUrl+"search";
        let params = new HttpParams().set("query",q);
        this.httpClient.get<BeerDate[]>(endPoint, {params})
        .subscribe(data =>{
            this.beerDataList = data as BeerDate[];
            this.searchEvent.emit({beerlist: this.beerDataList, message: "subscribed"});
        });
    }

    getBeerDataList(){
        if(this.beerDataList!=null && this.beerDataList.length>0){
            return this.beerDataList.slice();
        }
        else{
            return null;
        }
    }

    hide(beerData: BeerDate){
        console.log("enter emit");
        let index: number = this.beerDataList.indexOf(beerData);
        this.beerDataList.splice(index,1);
        this.hideEvent.emit(beerData);
    }

    searchAutoComplete(q:string){
        let endPoint: string = this.sourceUrl+"autocomplete";
        let params = new HttpParams().set("query",q);
        this.httpClient.get<AutoComplete[]>(endPoint, {params})
        .subscribe(data =>{
            this.autoComplete = data as AutoComplete[];
            this.autoCompleteEvent.emit();
        });
    }
}