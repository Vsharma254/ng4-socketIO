import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Country } from '../model/country';
import { baseURl } from './serviceConfig';

@Injectable()
export class CountryService {
    public url: string;
    constructor(private _http: Http) {
        this.url = baseURl;
    }
    getCountries(): Observable<Country[]> {
        return this._http.get(this.url + "countries").map(res => res.json());
    }
    addCountry(_country: Country) {
        console.log(_country);
        
        return this._http.post(this.url + "country", _country).map(res => res.json());
    }
    deleteCountry(_country: Country) {
        console.log(_country);
        
        
        return this._http.post(this.url + "deletecountry", _country).map(res => res.json());
    }
}