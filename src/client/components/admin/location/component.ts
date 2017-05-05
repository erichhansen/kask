import {Component, Input, OnInit} from '@angular/core';
import {Keg} from "../../../models/keg.model";
import {Location} from "../../../models/location.model";
import {LocationService} from "../../../services/location.service";

@Component({
    selector: 'location',
    templateUrl: './template.html',
    styleUrls: ['../../styles.scss', './styles.scss']
})
export class LocationComponent implements OnInit {

    contents: Keg[];
    loaded: boolean;
    editing: boolean;

    @Input() info: Location;

    constructor(
        private _locationService: LocationService
    ) { }

    ngOnInit() {
        if (this.info && this.info.LocationId) {
            this._locationService.getLocationContents(this.info.LocationId)
            .subscribe(
                beers => this.contents = beers,
                error => console.log(error),
                () => this.loaded = true
            );
        } else {
            this.editing = true;
            this.loaded = true;
        }
    }

    private addLocation() {
        this.loaded = false;
        this._locationService.addLocation(this.info)
        .subscribe(
            id => {
                this.info.LocationId = id;
            },
            err => console.log(err),
            () => this.loaded = true
        );
    }

    private editLocation() {
        this.loaded = false;
        this._locationService.updateLocation(this.info)
        .subscribe(
            success => {
                this.editing = false;
            },
            err => console.log(err),
            () => this.loaded = true
        );
    }

    private submitLocation() {
        if (this.info.LocationId) {
            this.editLocation();
        } else {
            this.addLocation();
        }
    }
}