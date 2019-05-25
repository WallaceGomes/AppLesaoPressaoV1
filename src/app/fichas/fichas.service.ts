import { Ficha } from "./ficha.model";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: "root" })
export class FichasService {
  private fichas: Ficha[] = [];
  private fichasUpdated = new Subject<Ficha[]>();

  constructor(private http: HttpClient, private router: Router, private loadingCtrl: LoadingController) {}

  getFichas() {
    this.http.get<{message: string, fichas: any}>('http://localhost:3000/api/fichas')
    .pipe(map((fichaData) => {
      return fichaData.fichas.map(ficha => {
        return {
          id: ficha._id,
          nome: ficha.nome,
          matricula: ficha.matricula,
          leito: ficha.leito,
          data: ficha.data,
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

  getFichasUpdateListener() {
    return this.fichasUpdated.asObservable();
  }

  getFicha(id: string) {
    return this.http.get<{
      _id: string,
      nome: string,
      matricula: string,
      leito: string,
      data: string,
      percepSens: any,
      umidade: any,
      atividade: any,
      mobilidade: any,
      nutricao: any,
      fricscisal: any,
      score: any }>('http://localhost:3000/api/fichas/' + id);
  }

  addFicha(
    nome: string,
    matricula: string,
    leito: string,
    data: string,
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
      leito: leito,
      data: data,
      percepSens: percepSens,
      umidade: umidade,
      atividade: atividade,
      mobilidade: mobilidade,
      nutricao: nutricao,
      fricscisal: fricscisal,
      score: score
    };
    this.http.post<{message: string, fichaId: string}>('http://localhost:3000/api/fichas', ficha)
    .subscribe((respostaDado) => {
        const id = respostaDado.fichaId;
        ficha.id = id;
        this.fichas.push(ficha);
        this.fichasUpdated.next([...this.fichas]);
        // this.loadingEnvioFormulario();
        // this.router.navigate(["/"]);
    });
  }

  updateFicha(id: string, nome: string,
    matricula: string,
    leito: string,
    data: string,
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
        leito: leito,
        data: data,
        percepSens: percepSens,
        umidade: umidade,
        atividade: atividade,
        mobilidade: mobilidade,
        nutricao: nutricao,
        fricscisal: fricscisal,
        score: score};
      this.http
        .put('http://localhost:3000/api/fichas/' + id, ficha)
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
    this.http.delete('http://localhost:3000/api/fichas/' + fichaId)
    .subscribe(() => {
      const fichasUpdate = this.fichas.filter(ficha => ficha.id !== fichaId);
      this.fichas = fichasUpdate;
      this.fichasUpdated.next([...this.fichas]);
    });
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
