import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LosRootModule} from "los-sections-lib";
import {provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LosRootModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
          provideMockStore()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeDefined();
  });

  it(`should render LosMainSectionComponent`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const losMainSectionComponent = fixture.debugElement.nativeElement.querySelector('los-main-section');

    expect(losMainSectionComponent).toBeTruthy();
  });
});
