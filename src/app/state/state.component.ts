import { Component, OnInit } from '@angular/core';
import { StateService } from '../shared/service/state.service'
import { CountryService } from '../shared/service/country.service'
import { State } from '../shared/model/state';
import { Country } from '../shared/model/country';


@Component({
    selector: 'state-selector',
    templateUrl: 'state.component.html',
    styleUrls: ["./state.component.css"], providers: [StateService, CountryService]
})
export class StateComponent implements OnInit {
    public state: State = { StateID: 0, CountryID: 0, Name: '', Description: '', CountryName:'' };
    public _stateList: State[] = [];
    public _selectedCountry: Country = { Name: '', CountryID: 0, Description: '' };
    public _countryList: Country[] = [];
    constructor(private _StateService: StateService, private _CountryService: CountryService) {
        this.getStatteList();
    }
    private getContryList() {
        this._CountryService.getCountries().subscribe(resp => {
            this._countryList = resp;
        });
    }
    private getStatteList(): State[] {
        this._StateService.getStates().subscribe(resp => {
            this._stateList = resp;
            
        });
        return this._stateList;
    }
    public clrearControls()
    {
       this.state= { StateID: 0, CountryID: 0, Name: '', Description: '', CountryName:'' };
       this._selectedCountry = { Name: '', CountryID: 0, Description: '' };
    }
    public addNewState() {
        if(this.state.Name == "" && this._selectedCountry.CountryID == 0)
        {
            alert("Please enter and select country");
            return;
        }
        this.state.CountryID = this._selectedCountry.CountryID;        
        this._StateService.addState(this.state).subscribe(re => {
            alert('New state is added successfully!!');
            this.getStatteList();
            this.clrearControls();
        
        });

    }
    ngOnInit() { this.getContryList(); }
}