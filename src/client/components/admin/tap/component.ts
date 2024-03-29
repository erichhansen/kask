import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Tap} from '../../../models/tap.model';
import {AdminService} from '../../../services/admin.service';
import {Beer} from '../../../models/beer.model';
import {TapService} from '../../../services/tap.service';
import {TapSession} from '../../../models/session.model';

@Component({
    selector: 'tap-edit',
    templateUrl: './template.html',
    styleUrls: ['../../styles.scss', './styles.scss']
})
export class TapEditComponent implements OnInit, OnDestroy {
    private subscriptions = [];
    tapSession: TapSession;

    isEditing: boolean;
    beerToLoad: Beer;

    @Input() locations: Location[];
    @Input() info: Tap;
    @Input() tapNum: number;

    constructor(
        private _adminService: AdminService,
        private _tapService: TapService
    ) { }

    ngOnInit() {
        this.subscriptions.push(
            this._tapService.observeTapContents(this.info.TapId)
            .merge(this._tapService.getTapContents(this.info.TapId))
            .subscribe(
                tapSession => this.tapSession = tapSession
            )
        );
    }

    submitEdit() {
        this._tapService.updateTap(this.info)
            .subscribe(
                success => {
                    this.isEditing = false;
                }, err => console.log(err)
            );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];
    }
}
