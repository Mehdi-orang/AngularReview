import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FruitDetailComponent } from './fruit-datail.component';

describe('FruitDatailComponent', () => {
  let component: FruitDetailComponent;
  let fixture: ComponentFixture<FruitDetailComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
