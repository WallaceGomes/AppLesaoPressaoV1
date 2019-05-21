import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLoginPage } from './pagina-login.page';

describe('PaginaLoginPage', () => {
  let component: PaginaLoginPage;
  let fixture: ComponentFixture<PaginaLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
