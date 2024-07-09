import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiComponentComponent } from './emoji-component.component';

describe('EmojiComponentComponent', () => {
  let component: EmojiComponentComponent;
  let fixture: ComponentFixture<EmojiComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
