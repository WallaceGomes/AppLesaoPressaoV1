import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { environment } from './../../environments/environment';
import { Ficha } from "./ficha.model";
import { Chart } from 'chart.js';
const BACKEND_URL = environment.apiUrl + "/fichas/";

@Injectable({ providedIn: "root" })
export class FichasService {
  private fichas: Ficha[] = [];
  private fichasUpdated = new Subject<Ficha[]>();

  chart = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) {}

  getFichas() {
    // fichasPerPage: number, currentPage: number const queryParams = `?pagesize=${fichasPerPage}&page=${currentPage}`;
    this.http.get<{message: string, fichas: any}>(BACKEND_URL)
    .pipe(map((fichaData) => {
      return fichaData.fichas.map(ficha => {
        return {
          id: ficha._id,
          nome: ficha.nome,
          matricula: ficha.matricula,
          dataInternacao: ficha.dataInternacao,
          leito: ficha.leito,
          data: ficha.data,
          presencaLesao: ficha.presencaLesao,
          localLesao: ficha.localLesao,
          percepSens: ficha.percepSens,
          umidade: ficha.umidade,
          atividade: ficha.atividade,
          mobilidade: ficha.mobilidade,
          nutricao: ficha.nutricao,
          fricscisal: ficha.fricscisal,
          score: ficha.score,
          criador: ficha.criador
        };
      });
    }))
    .subscribe(fichastransf => {
        this.fichas = fichastransf;
        this.fichasUpdated.next([...this.fichas]);
    });
  }

  // getFichasAnalise() {
  //   this.http.get<{message: string, fichas: any}>(BACKEND_URL)
  //   .pipe(map((fichaData) => {
  //     return fichaData.fichas.map(ficha => {
  //       return {
  //         id: ficha._id,
  //         nome: ficha.nome,
  //         matricula: ficha.matricula,
  //         dataInternacao: ficha.dataInternacao,
  //         leito: ficha.leito,
  //         data: ficha.data,
  //         percepSens: ficha.percepSens,
  //         umidade: ficha.umidade,
  //         atividade: ficha.atividade,
  //         mobilidade: ficha.mobilidade,
  //         nutricao: ficha.nutricao,
  //         fricscisal: ficha.fricscisal,
  //         score: ficha.score,
  //         criador: ficha.criador
  //       };
  //     });
  //   }))
  //   .subscribe(fichastransf => {
  //       this.fichas = fichastransf;
  //       this.fichasUpdated.next([...this.fichas]);
  //   });
  // }

  getFichasUpdateListener() {
    return this.fichasUpdated.asObservable();
  }

  getFicha(id: string) {
    return this.http.get<{
      _id: string,
      nome: string,
      matricula: string,
      dataInternacao: string,
      leito: string,
      data: string,
      presencaLesao: string,
      localLesao: string,
      percepSens: any,
      umidade: any,
      atividade: any,
      mobilidade: any,
      nutricao: any,
      fricscisal: any,
      score: any }>(BACKEND_URL + id);
  }

  addFicha(
    nome: string,
    matricula: string,
    dataInternacao: string,
    leito: string,
    data: string,
    presencaLesao: string,
    localLesao: string,
    percepSens: any,
    umidade: any,
    atividade: any,
    mobilidade: any,
    nutricao: any,
    fricscisal: any,
    score: any
  ) {
    const ficha: Ficha = {
        id: null,
      nome: nome,
      matricula: matricula,
      dataInternacao: dataInternacao,
      leito: leito,
      data: data,
      presencaLesao: presencaLesao,
      localLesao: localLesao,
      percepSens: percepSens,
      umidade: umidade,
      atividade: atividade,
      mobilidade: mobilidade,
      nutricao: nutricao,
      fricscisal: fricscisal,
      score: score
    };
    this.http.post<{message: string, fichaId: string}>(BACKEND_URL, ficha)
    .subscribe((respostaDado) => {
        const id = respostaDado.fichaId;
        ficha.id = id;
        this.fichas.push(ficha);
        this.fichasUpdated.next([...this.fichas]);
        this.alertConfirm();
    });
  }

  updateFicha(id: string, nome: string,
    matricula: string,
    dataInternacao: string,
    leito: string,
    data: string,
    presencaLesao: string,
    localLesao: string,
    percepSens: any,
    umidade: any,
    atividade: any,
    mobilidade: any,
    nutricao: any,
    fricscisal: any,
    score: any) {
      const ficha: Ficha = {  id: id,
        nome: nome,
        matricula: matricula,
        dataInternacao: dataInternacao,
        leito: leito,
        data: data,
        presencaLesao: presencaLesao,
        localLesao: localLesao,
        percepSens: percepSens,
        umidade: umidade,
        atividade: atividade,
        mobilidade: mobilidade,
        nutricao: nutricao,
        fricscisal: fricscisal,
        score: score};
      this.http
        .put(BACKEND_URL + id, ficha)
        .subscribe(response => {
          const fichasUpdate = [...this.fichas];
          const oldFichaIndex = fichasUpdate.findIndex(p => p.id === ficha.id);
          fichasUpdate[oldFichaIndex] = ficha;
          this.fichas = fichasUpdate;
          this.fichasUpdated.next([...this.fichas]);
          this.router.navigate(["pagina-listar-fichas"]);
        });
    }

  deleteFicha(fichaId: string){
    this.http.delete(BACKEND_URL + fichaId)
    .subscribe(() => {
      const fichasUpdate = this.fichas.filter(ficha => ficha.id !== fichaId);
      this.fichas = fichasUpdate;
      this.fichasUpdated.next([...this.fichas]);
    });
  }

  filtrarItens(pesquisa) {
    return this.fichas.filter((item) => {
        const x = pesquisa;
        if (x.charAt(0) >= 0 && x.charAt(0) <= 9) { // verifica o primeiro caractere da string: se for numero pesquisa pela matricula
            return item.matricula.toLowerCase().includes(pesquisa.toLowerCase());
        } else {
            return item.nome.toLowerCase().includes(pesquisa.toLowerCase());
        }
    });
}

async alertConfirm() {
  const alert = await this.alertCtrl.create({
    header: 'Sucesso!',
    message: 'Ficha salva na base de dados!',
    buttons: [
       {
        text: 'OK',
        handler: () => {
          this.router.navigate(["/pagina-listar-pacientes"]);
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
