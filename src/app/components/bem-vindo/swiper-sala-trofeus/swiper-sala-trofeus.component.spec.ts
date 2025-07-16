import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwiperSalaTrofeusComponent } from './swiper-sala-trofeus.component';

describe('SwiperSalaTrofeusComponent', () => {
  let component: SwiperSalaTrofeusComponent;
  let fixture: ComponentFixture<SwiperSalaTrofeusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiperSalaTrofeusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperSalaTrofeusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
