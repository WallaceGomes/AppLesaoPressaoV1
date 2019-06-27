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

    totalFichas = 10;
    fichasPorPage = 2;
    currentPage = 1;
    pageSizeOptions = [2, 5, 10];

    constructor(public fichasService: FichasService) {}

    ngOnInit() {
        this.fichasService.getFichas();
        this.fichasSub = this.fichasService.getFichasUpdateListener()
        .subscribe((fichas: Ficha[]) => {
            this.fichas = fichas.slice(0).reverse(); // this.fichas guarda o array de fichas carregadas do banco
            // slice(0).reverse(); inverte o array de fichas
        });
    }

    // onChangePage(pageData: PageEvent) {
    //     this.currentPage = pageData.pageIndex + 1;
    //     this.fichasPorPage = pageData.pageSize;
    //     this.fichasService.getFichas(this.fichasPorPage, this.currentPage);
    // }

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
