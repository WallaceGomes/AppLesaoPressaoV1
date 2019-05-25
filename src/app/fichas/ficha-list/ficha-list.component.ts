
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ficha } from './../ficha.model';
import { FichasService } from '../fichas.service';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-ficha-list',
    templateUrl: './ficha-list.component.html'
})
export class FichaListComponent implements OnInit, OnDestroy {
    // fichas = [
    //     { nome: 'Nome paciente1', matricula: 'Matricula1' },
    //     { nome: 'Nome paciente2', matricula: 'Matricula2' },
    //     { nome: 'Nome paciente3', matricula: 'Matricula3' }
    // ];

    fichas: Ficha[] = [];
    private fichasSub: Subscription;
    totalFichas = 10;
    fichasPorPage = 5;
    pageSizeOptions = [1 , 2, 5, 10];

    constructor(public fichasService: FichasService) {}

    ngOnInit() {
        this.fichasService.getFichas();
        this.fichasSub = this.fichasService.getFichasUpdateListener()
        .subscribe((fichas: Ficha[]) => {
            this.fichas = fichas;
        });
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(fichaId: string) {
        this.fichasService.deleteFicha(fichaId);
    }

    ngOnDestroy() {
        this.fichasSub.unsubscribe();
    }
}
