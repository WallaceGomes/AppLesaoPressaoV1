import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaFichaAvaliacaoPage } from './pagina-ficha-avaliacao.page';
import { FichaCreateComponent } from './../fichas/ficha-create/ficha-create.component';
import { MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatRadioModule, MatSelectModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PaginaFichaAvaliacaoPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: [
    PaginaFichaAvaliacaoPage,
    FichaCreateComponent
  ]
})
export class PaginaFichaAvaliacaoPageModule {}
