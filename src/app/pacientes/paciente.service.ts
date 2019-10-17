import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { environment } from './../../environments/environment';
import { Paciente } from "./paciente.model";
import { map } from 'rxjs/internal/operators/map';
const BACKEND_URL = environment.apiUrl + "/pacientes/";

@Injectable({ providedIn: "root" })
export class PacienteService {
    private pacientes: Paciente[] = [];
    private pacientesUpdated = new Subject<Paciente[]>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
        ) {}

    getPacientes() {
    this.http.get<{message: string, pacientes: any}>(BACKEND_URL)
    .pipe(map((pacienteData) => {
        return pacienteData.pacientes.map(paciente => {
        return {
            id: paciente._id,
            nome: paciente.nome,
            matricula: paciente.matricula,
            dataInternacao: paciente.dataInternacao,
            dataNascimento: paciente.dataNascimento,
            patologia: paciente.patologia,
            comorbidades: paciente.comorbidades
        };
        });
    }))
    .subscribe(pacientestransf => {
        this.pacientes = pacientestransf;
        this.pacientesUpdated.next([...this.pacientes]);
    });
    }

    getPaciente(id: string) {
    return this.http.get<{
        _id: string,
        nome: string,
        matricula: string,
        dataInternacao: string,
        dataNascimento: string,
        patologia: string,
        comorbidades: string
     }>(BACKEND_URL + id);
    }

    getPacientesUpdateListener() {
        return this.pacientesUpdated.asObservable();
    }

    addPaciente(
    nome: string,
    matricula: string,
    dataInternacao: string,
    dataNascimento: string,
    patologia: string,
    comorbidades: string
    ) {
    const paciente: Paciente = {
        id: null,
        nome: nome,
        matricula: matricula,
        dataInternacao: dataInternacao,
        dataNascimento: dataNascimento,
        patologia: patologia,
        comorbidades: comorbidades
    };
    this.http.post<{message: string, pacienteId: string}>(BACKEND_URL, paciente)
    .subscribe((respostaDado) => {
        const id = respostaDado.pacienteId;
        paciente.id = id;
        this.pacientes.push(paciente);
        this.pacientesUpdated.next([...this.pacientes]);
        this.alertConfirm();
        // this.loadingEnvioFormulario();
        // this.router.navigate(["/"]);
    });
    }

    deletePaciente(pacienteId: string){
    this.http.delete(BACKEND_URL + pacienteId)
    .subscribe(() => {
        const pacientesUpdate = this.pacientes.filter(paciente => paciente.id !== pacienteId);
        this.pacientes = pacientesUpdate;
        this.pacientesUpdated.next([...this.pacientes]);
    });
    }

    updatePaciente(id: string, nome: string,
        matricula: string,
        dataInternacao: string,
        dataNascimento: string,
        patologia: string,
        comorbidades: string
        ) {
          const paciente: Paciente = {  id: id,
            nome: nome,
            matricula: matricula,
            dataInternacao: dataInternacao,
            dataNascimento: dataNascimento,
            patologia: patologia,
            comorbidades: comorbidades
        };
          this.http
            .put(BACKEND_URL + id, paciente)
            .subscribe(response => {
              const pacientesUpdated = [...this.pacientes];
              const oldFichaIndex = pacientesUpdated.findIndex(p => p.id === paciente.id);
              this.pacientesUpdated[oldFichaIndex] = paciente;
              this.pacientesUpdated.next([...this.pacientes]);
              this.router.navigate(["pagina-listar-fichas"]);
            });
        }

    filtrarItens(pesquisa) {
        return this.pacientes.filter((item) => {
            const x = pesquisa;
            if (x.charAt(0) >= 0 && x.charAt(0) <= 9) { // verifica o primeiro caractere da string: se for numero pesquisa pela matricula
                return item.matricula.toLowerCase().includes(pesquisa.toLowerCase());
            } else {
                return item.nome.toLowerCase().includes(pesquisa.toLowerCase());
            }
        });
    }

    filtrarItensPorData(data1, data2) {
        return this.pacientes.filter((item) => {
        return item.dataInternacao >= data1 && item.dataInternacao <= data2;
        });
    }

    async alertConfirm() {
        const alert = await this.alertCtrl.create({
          header: 'Sucesso!',
          message: 'Paciente cadastrado!',
          buttons: [
             {
              text: 'OK',
              handler: () => {
                this.router.navigate(["/"]);
              }
            }
          ]
        });
      
        await alert.present();
      }

    async loadingEnvioFormulario() {
    const loading = await this.loadingCtrl.create({
    message : 'Salvando...',
        duration: 1500,
        translucent: true
        });
    return await loading.present();
    }
}
