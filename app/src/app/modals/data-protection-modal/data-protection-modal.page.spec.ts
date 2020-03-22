import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataProtectionModalPage } from './data-protection-modal.page';

describe('DataProtectionModalPage', () => {
  let component: DataProtectionModalPage;
  let fixture: ComponentFixture<DataProtectionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtectionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataProtectionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
