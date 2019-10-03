import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BeerDate } from '../models/beerData';
import { AutoComplete } from '../models/autoComplete';
import { Observable } from 'rxjs';

@Injectable()
export class BeerService{

    private sourceUrl: string ="https://api.openbrewerydb.org/breweries/";
    private beerDataList: BeerDate[];
    private autoComplete: AutoComplete[];
    private pages: number[];

    hideEvent = new EventEmitter<BeerDate>();
    searchEvent = new EventEmitter<{beerlist:BeerDate[], message:string}>();
    pageChange=new EventEmitter();
    autoCompleteEvent = new EventEmitter<AutoComplete>();

    constructor(private httpClient: HttpClient){}
    searchBeer(q:string){
        this.searchEvent.emit({beerlist: this.beerDataList, message: "enter"}); //it says that it's enter
        let endPoint: string =this.sourceUrl+"search";
        let params = new HttpParams().set("query",q);
        this.httpClient.get<BeerDate[]>(endPoint, {params})
        .subscribe(data =>{
            this.beerDataList = data as BeerDate[];
            this.searchEvent.emit({beerlist: this.beerDataList, message: "subscribed"});
        });
    }

    getBeerDataList(pageNumber? : number) : BeerDate[]{
        this.pageChange.emit();
        if(pageNumber==null){
            pageNumber=1;
        }
        if(this.beerDataList!=null && this.beerDataList.length>0){
            let startIndex: number = (pageNumber*10-10);
            let lastIndex: number = pageNumber<this.getPagesNumber().length ? startIndex+9: startIndex+this.beerDataList.length-startIndex;
            console.log("first Index:"+startIndex);
            console.log("last Index:"+lastIndex);
            return this.beerDataList.slice(startIndex, lastIndex);
        }
        else{
            return null;
        }
    }

    getPagesNumber(): number[]{
        if(this.beerDataList!=null){
            this.pages = new Array<number>(Math.round(this.beerDataList.length/10+0.5));
            for(let i=0; i<this.pages.length; i++){
                this.pages[i]=i+1;
            }
        }
        return this.pages;
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

    getAutoComplete(){
        return this.autoComplete.slice(0,9);
    }
}