import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatDividerModule,
  MatButtonModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { PercepSensDuvidaComponent } from './ajuda/percepsens/percepsens-duvida.component';
import { UmidadeDuvidaComponent } from './ajuda/umidade/umidade-duvida.component';
import { AtividadeDuvidaComponent } from './ajuda/atividade/atividade-duvida.component';
import { MobilidadeDuvidaComponent } from './ajuda/mobilidade/mobilidade-duvida.component';
import { NutricaoDuvidaComponent } from './ajuda/nutricao/nutricao-duvida.component';
import { FricsisDuvidaComponent } from './ajuda/fricsis/fricsis-duvida.component';
import { GraficoPacientesComponent } from './analises/graficos/grafico-pacientes.component';
import { ManejoUmidadeDuvidaComponent } from './ajuda/manejoumidade/umidade-manejo-duvida.component';
import { Estagio1DuvidaComponent } from './ajuda/estagio1/estagio1-lpp-duvida.component';
import { Estagio2DuvidaComponent } from './ajuda/estagio2/estagio2-lpp-duvida.component';
import { Estagio3DuvidaComponent } from './ajuda/estagio3/estagio3-lpp-duvida.component';
import { Estagio4DuvidaComponent } from './ajuda/estagio4/estagio4-lpp-duvida.component';
import { IndicadoresComponent } from './analises/indicadores/indicadores.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PercepSensDuvidaComponent,
    UmidadeDuvidaComponent,
    AtividadeDuvidaComponent,
    MobilidadeDuvidaComponent,
    NutricaoDuvidaComponent,
    FricsisDuvidaComponent,
    ManejoUmidadeDuvidaComponent,
    Estagio1DuvidaComponent,
    Estagio2DuvidaComponent,
    Estagio3DuvidaComponent,
    Estagio4DuvidaComponent,
    GraficoPacientesComponent,
    IndicadoresComponent],
  entryComponents: [ErrorComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
