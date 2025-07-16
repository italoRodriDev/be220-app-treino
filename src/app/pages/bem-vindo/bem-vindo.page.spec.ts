import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BemVindoPage } from './bem-vindo.page';

describe('BemVindoPage', () => {
  let component: BemVindoPage;
  let fixture: ComponentFixture<BemVindoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BemVindoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
