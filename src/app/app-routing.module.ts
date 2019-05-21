import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pagina-ficha-avaliacao', loadChildren: './pagina-ficha-avaliacao/pagina-ficha-avaliacao.module#PaginaFichaAvaliacaoPageModule' },
  { path: 'editarficha/:fichaId', loadChildren: './pagina-ficha-avaliacao/pagina-ficha-avaliacao.module#PaginaFichaAvaliacaoPageModule' },
  { path: 'pagina-base-dados', loadChildren: './pagina-base-dados/pagina-base-dados.module#PaginaBaseDadosPageModule' },
  { path: 'pagina-login', loadChildren: './pagina-login/pagina-login.module#PaginaLoginPageModule' },
  { path: 'pagina-cadastro', loadChildren: './pagina-cadastro/pagina-cadastro.module#PaginaCadastroPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
