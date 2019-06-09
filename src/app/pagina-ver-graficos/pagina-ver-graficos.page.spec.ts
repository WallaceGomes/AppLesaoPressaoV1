import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVerGraficosPage } from './pagina-ver-graficos.page';

describe('PaginaVerGraficosPage', () => {
  let component: PaginaVerGraficosPage;
  let fixture: ComponentFixture<PaginaVerGraficosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaVerGraficosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaVerGraficosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
