import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountSelectPageComponent } from './count-select-page.component';

describe('CountSelectPageComponent', () => {
  let component: CountSelectPageComponent;
  let fixture: ComponentFixture<CountSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountSelectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
