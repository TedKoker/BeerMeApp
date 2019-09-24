import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BeerDate } from '../models/beerData';

@Injectable()
export class BeerService{

    private sourceUrl: string ="https://api.openbrewerydb.org/breweries/";
    private beerDataList: BeerDate[];

    constructor(private httpClient: HttpClient){}
    
    searchBeer(q:string){
        let endPoint: string =this.sourceUrl+"search";
        let params = new HttpParams().set("query",q);
        this.httpClient.get<BeerDate[]>(endPoint, {params})
        .subscribe(data =>{
            this.beerDataList = data as BeerDate[];
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
}