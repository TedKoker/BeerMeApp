import {HttpRequest, HttpResponse, HttpInterceptor, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';

abstract class HttpCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any>|null;
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>) : void;
}

@Injectable()
export class HttpChacheService implements HttpCache{
    private cache = {};

    put(req: HttpRequest<any>, resp: HttpResponse<any>) : void{
        this.cache[req.urlWithParams] = resp;
    }

    get(req: HttpRequest<any>): HttpResponse<any>|null{
        return this.cache[req.urlWithParams];
    }
}