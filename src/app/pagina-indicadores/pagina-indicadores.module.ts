import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatProgressSpinnerModule,
  MatExpansionModule
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
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  declarations: [
    PaginaIndicadoresPage,
    IndicadoresPacientesComponent]
})
export class PaginaIndicadoresPageModule {}
