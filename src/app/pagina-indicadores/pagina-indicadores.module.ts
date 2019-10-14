import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndicadoresPacientesComponent } from './../analises/indicadores/indicadores-pacientes.component';

import { PaginaIndicadoresPage } from './pagina-indicadores.page';
import { MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatRadioModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PaginaIndicadoresPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PaginaIndicadoresPage,
    IndicadoresPacientesComponent]
})
export class PaginaIndicadoresPageModule {}
