import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ficha } from './../ficha.model';
import { FichasService } from '../fichas.service';
import { PageEvent } from '@angular/material';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
    selector: 'app-ficha-list',
    templateUrl: './ficha-list.component.html'
})
export class FichaListComponent implements OnInit, OnDestroy{
    // fichas = [
    //     { nome: 'Nome paciente1', matricula: 'Matricula1' },
    //     { nome: 'Nome paciente2', matricula: 'Matricula2' },
    //     { nome: 'Nome paciente3', matricula: 'Matricula3' }
    // ];
    // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    fichas: Ficha[] = [];
    private fichasSub: Subscription;
    pesquisa: any = "";

    totalFichas = 10;
    fichasPorPage = 2;
    currentPage = 1;
    pageSizeOptions = [2, 5, 10];

    constructor(public fichasService: FichasService) {}

    // ngOnInit(){
    //     this.loadData(event);
    // }
     ngOnInit() {
         this.fichasService.getFichas();
         this.fichasSub = this.fichasService.getFichasUpdateListener()
         .subscribe((fichas: Ficha[]) => {
             this.fichas = fichas.slice(0).reverse(); // this.fichas guarda o array de fichas carregadas do banco
             // slice(0).reverse(); inverte o array de fichas
         });
     }

    onChangePage(pageData: PageEvent) {
         this.currentPage = pageData.pageIndex + 1;
         this.fichasPorPage = pageData.pageSize;
         this.fichasService.getFichas();
     }



    // loadData(event) {
    //     setTimeout(() => {
    //       console.log('Done');
    //       this.fichasService.getFichas();
    //       this.fichasSub = this.fichasService.getFichasUpdateListener()
    //      .subscribe((fichas: Ficha[]) => {
    //         this.fichas = fichas.slice(0).reverse(); // this.fichas guarda o array de fichas carregadas do banco
    //          // slice(0).reverse(); inverte o array de fichas
    //      });
    //       event.target.complete();


    //       if (this.fichas.length == 1000) {
    //             event.target.disabled = true;
    //         }
    //     }, 500);
    //   }

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
