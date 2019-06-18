import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaVerGraficosPage } from './pagina-ver-graficos.page';
import { MatExpansionModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { GraficoPacientesComponent } from '../analises/graficos/grafico-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaVerGraficosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [ScreenOrientation],
  declarations: [PaginaVerGraficosPage, GraficoPacientesComponent]
})
export class PaginaVerGraficosPageModule {}
