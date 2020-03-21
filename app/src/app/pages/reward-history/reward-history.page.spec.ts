import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RewardHistoryPage } from './reward-history.page';

describe('RewardHistoryPage', () => {
  let component: RewardHistoryPage;
  let fixture: ComponentFixture<RewardHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RewardHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
