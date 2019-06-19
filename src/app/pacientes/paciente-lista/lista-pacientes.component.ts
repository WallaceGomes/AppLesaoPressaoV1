import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PacienteService } from '../paciente.service';
import { PageEvent } from '@angular/material';
import { Paciente } from '../paciente.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { reduce } from 'rxjs/operators';

@Component({
    selector: 'app-lista-pacientes',
    templateUrl: './lista-pacientes.component.html'
})
export class ListaPacientesComponent implements OnInit, OnDestroy{

    pacientes: Paciente[] = [];
    pesquisa: any = "";

    private pacientesSub: Subscription;
    constructor(public pacientesService: PacienteService, private alertCtrl: AlertController, private router: Router) {}

    ngOnInit() {
        this.pacientesService.getPacientes();
        this.pacientesSub = this.pacientesService.getPacientesUpdateListener()
        .subscribe((pacientes: Paciente[]) => {
            this.pacientes = pacientes;
        });
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(pacienteId: string) {
        // this.pacientesService.deletePaciente(pacienteId);
        this.alertConfirm(pacienteId);
    }

    filtrarItens() {
        this.pacientes = this.pacientesService.filtrarItens(this.pesquisa);
    }

    ngOnDestroy() {
        this.pacientesSub.unsubscribe();
    }

    async alertConfirm(pacienteId: string) {
        const alert = await this.alertCtrl.create({
          header: 'Atenção!',
          message: 'Confirma exclusão do paciente?',
          cssClass: 'buttonCss',
          buttons: [
                {
                    text: 'Excluir',
                    cssClass: 'excluir-button',
                    handler: () => {
                    this.pacientesService.deletePaciente(pacienteId);
                    this.router.navigate(["/pagina-listar-pacientes"]);
                    }
                },
                    {
                        text: 'Cancelar',
                    }
          ]
        });
        await alert.present();
      }
}
