
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
    pesquisa: any = "";

    constructor(public fichasService: FichasService) {}

    ngOnInit() {
        this.fichasService.getFichas();
        this.fichasSub = this.fichasService.getFichasUpdateListener()
        .subscribe((fichas: Ficha[]) => {
            this.fichas = fichas; // this.fichas guarda o array de fichas carregadas do banco
        });
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(fichaId: string) {
        this.fichasService.deleteFicha(fichaId);
    }

    filtrarItens() {
        this.fichas = this.fichasService.filtrarItens(this.pesquisa);
    }


    ngOnDestroy() {
        this.fichasSub.unsubscribe();
    }
}
