import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LosMainSectionComponent } from './los-main-section.component';
import 'jasmine';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Status} from "los-types-lib";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LosMainSectionService} from "./los-filter-servers.service";
import {Store} from "@ngrx/store";
import {errorSelector, serversSelector, ServiceStatus} from "los-store-lib";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {
  mockServers, mockServersAfterChanged, mockServersWithRebooteState,
  mockError,
  MockFilterServersPipe,
  MockFilterStatusesPipe,
  MockLosMainSectionService,
} from "./los-main-section-mock/los-main-section.mock";


describe('LosMainSectionComponent', () => {

  let component: LosMainSectionComponent;
  let fixture: ComponentFixture<LosMainSectionComponent>;
  let store: MockStore<ServiceStatus>;
  let mockLosMainSectionService: MockLosMainSectionService;
  const initialState: ServiceStatus = new ServiceStatus();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LosMainSectionComponent,
        MockFilterStatusesPipe,
        MockFilterServersPipe
      ],
      imports: [
        BrowserModule,
        FormsModule,
        MatSnackBarModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: errorSelector, value: null },
            { selector: serversSelector, value: mockServers },
          ],
        }),
        {provide: LosMainSectionService, useClass: MockLosMainSectionService}
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(LosMainSectionComponent);
    component = fixture.componentInstance;


    mockLosMainSectionService = TestBed.get(LosMainSectionService);
    spyOn(mockLosMainSectionService, 'openSnackBar').and.callThrough();
    spyOn(mockLosMainSectionService, 'serverStatusHandler').and.callThrough();
    spyOn(mockLosMainSectionService, 'pingingServer').and.callThrough();

    store = TestBed.get<Store<ServiceStatus>>(Store);
    fixture.detectChanges();
  });


  it('should create component', () => {
    expect(component).toBeTruthy();
  });


  it('should open snackBar', () => {
    store.overrideSelector(errorSelector, mockError.error.errorMessage);
    store.refreshState();
    fixture.detectChanges();

    expect(mockLosMainSectionService.openSnackBar).toHaveBeenCalled();
   });


  it('should open snackBar when server status will change', () => {
    store.overrideSelector(serversSelector, mockServersAfterChanged );
    store.refreshState();
    fixture.detectChanges();

    expect(mockLosMainSectionService.serverStatusHandler).toHaveBeenCalled();
  });

  it('should start pinging server when state was set on reboote', () => {
    store.overrideSelector(serversSelector, mockServersWithRebooteState );
    store.refreshState();
    fixture.detectChanges();

    expect(mockLosMainSectionService.rebooteServers.length).toBe(2);
  });

  it('should stop pinging server when state was changed from reboote', () => {
    store.overrideSelector(serversSelector, mockServersWithRebooteState );
    store.refreshState();
    fixture.detectChanges();
    expect(mockLosMainSectionService.rebooteServers.length).toBe(2);
    store.overrideSelector(serversSelector, mockServers );
    store.refreshState();
    fixture.detectChanges();
    expect(mockLosMainSectionService.rebooteServers.length).toBe(0);
  });

  it('should render table of servers', () => {
    store.overrideSelector(serversSelector, mockServersWithRebooteState );
    store.refreshState();
    fixture.detectChanges();
    const numberOfRow = fixture.debugElement.nativeElement.querySelectorAll('tr').length - 1;

    expect(numberOfRow).toBe(mockServersWithRebooteState.length);
  });

  it('should work with filterServers pipe', () => {
    store.overrideSelector(serversSelector, mockServersWithRebooteState );
    store.refreshState();
    fixture.detectChanges();

    component.filterServersValue = "US";
    fixture.detectChanges();
    let numberOfRow: number = fixture.debugElement.nativeElement.querySelectorAll('tr').length - 1;
    let numberOfServers: string = fixture.debugElement.nativeElement.querySelector('div.number-of-servers').textContent;
    expect(numberOfRow).toBe(mockServersWithRebooteState.length);
    expect(numberOfServers).toBe('Number of elements: 2');

    component.filterServersValue = "USss";
    fixture.detectChanges();
    numberOfRow = fixture.debugElement.nativeElement.querySelectorAll('tr').length - 1;
    numberOfServers = fixture.debugElement.nativeElement.querySelector('div.number-of-servers').textContent;
    expect(numberOfRow).toBe(0);
    expect(numberOfServers).toBe('Number of elements: 0');

  });
});
