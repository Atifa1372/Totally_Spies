import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectPageComponent } from './category-select-page.component';

describe('CategorySelectPageComponent', () => {
  let component: CategorySelectPageComponent;
  let fixture: ComponentFixture<CategorySelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySelectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
