import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ficha } from './../ficha.model';
import { FichasService } from '../fichas.service';
import { PageEvent } from '@angular/material';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-ficha-list',
    templateUrl: './ficha-list.component.html',
    styleUrls: ['./ficha-list.component.css']
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

    carregando = false;

    constructor(public fichasService: FichasService, private alertCtrl: AlertController) {}

    // ngOnInit(){
    //     this.loadData(event);
    // }
     ngOnInit() {
        this.carregando = true;
        this.fichasService.getFichas();
        this.carregando = false;
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
        // this.fichasService.deleteFicha(fichaId);
        this.alertConfirm(fichaId);
    }

    filtrarItens() {
        this.fichas = this.fichasService.filtrarItens(this.pesquisa);
    }

    async alertConfirm(fichaId: string) {
        const alert = await this.alertCtrl.create({
          header: 'Atenção!',
          message: 'Confirma exclusão da ficha?',
          cssClass: 'buttonCss',
          buttons: [
                {
                    text: 'Excluir',
                    cssClass: 'excluir-button',
                    handler: () => {
                    this.fichasService.deleteFicha(fichaId);
                    }
                },
                    {
                        text: 'Cancelar',
                    }
          ]
        });
        await alert.present();
      }


    ngOnDestroy() {
        this.fichasSub.unsubscribe();
    }
}
