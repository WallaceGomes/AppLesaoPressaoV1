import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaIndicadoresPage } from './pagina-indicadores.page';

describe('PaginaIndicadoresPage', () => {
  let component: PaginaIndicadoresPage;
  let fixture: ComponentFixture<PaginaIndicadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaIndicadoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaIndicadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
