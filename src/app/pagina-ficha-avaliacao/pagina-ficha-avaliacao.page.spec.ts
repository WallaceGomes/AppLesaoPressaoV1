import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFichaAvaliacaoPage } from './pagina-ficha-avaliacao.page';

describe('PaginaFichaAvaliacaoPage', () => {
  let component: PaginaFichaAvaliacaoPage;
  let fixture: ComponentFixture<PaginaFichaAvaliacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaFichaAvaliacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFichaAvaliacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
