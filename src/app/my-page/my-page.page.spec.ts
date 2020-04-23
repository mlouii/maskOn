import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPagePage } from './my-page.page';

describe('MyPagePage', () => {
  let component: MyPagePage;
  let fixture: ComponentFixture<MyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
