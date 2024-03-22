import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedbComponent } from './indexedb.component';

describe('IndexedbComponent', () => {
  let component: IndexedbComponent;
  let fixture: ComponentFixture<IndexedbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexedbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
