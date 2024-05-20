import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPComponent } from './cart-p.component';

describe('CartPComponent', () => {
  let component: CartPComponent;
  let fixture: ComponentFixture<CartPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
