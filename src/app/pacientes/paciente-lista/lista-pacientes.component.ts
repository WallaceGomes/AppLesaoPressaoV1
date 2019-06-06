import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PacienteService } from '../paciente.service';
import { PageEvent } from '@angular/material';
import { Paciente } from '../paciente.model';

@Component({
    selector: 'app-lista-pacientes',
    templateUrl: './lista-pacientes.component.html'
})
export class ListaPacientesComponent implements OnInit, OnDestroy{

    pacientes: Paciente[] = [];
    pesquisa: any = "";

    private pacientesSub: Subscription;
    constructor(public pacientesService: PacienteService) {}

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
        this.pacientesService.deletePaciente(pacienteId);
    }

    filtrarItens() {
        this.pacientes = this.pacientesService.filtrarItens(this.pesquisa);
    }

    ngOnDestroy() {
        this.pacientesSub.unsubscribe();
    }
}
