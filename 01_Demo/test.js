import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CertificationsInspectionsComponent } from './certifications-inspections.component';
import { CertificationsDetailsService } from './certifications-details.service';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

describe('CertificationsInspectionsComponent', () => {
  let component: CertificationsInspectionsComponent;
  let fixture: ComponentFixture<CertificationsInspectionsComponent>;
  let certificationServiceMock: jest.Mocked<CertificationsDetailsService>;
  let changeDetectorRefMock: jest.Mocked<ChangeDetectorRef>;

  const mockInspectionData = [
    {
      inspectionDate: '2024-02-22',
      NBR: '12345',
      numberOfCounts: 100,
      percentShedFemale: 45.5,
      totalSilk: 1000,
      percentShedMale: 54.5,
      percentTasselsPulled: 80,
      offTypeFemale: 2,
      offTypeMale: 1,
      inspectorName: 'John Doe'
    }
  ];

  beforeEach(async () => {
    certificationServiceMock = {
      getCertificationsDetails: jest.fn().mockReturnValue(of(mockInspectionData)),
    } as any;

    changeDetectorRefMock = {
      markForCheck: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ CertificationsInspectionsComponent ],
      imports: [ MatTableModule ],
      providers: [
        { provide: CertificationsDetailsService, useValue: certificationServiceMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationsInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct displayed columns', () => {
    const expectedColumns = [
      'inspectionDate',
      'NBR',
      'numberOfCounts',
      'percentShedFemale',
      'totalSilk',
      'percentShedMale',
      'percentTasselsPulled',
      'offTypeFemale',
      'offTypeMale',
      'inspectorName',
      'EDIT',
      'DELETE'
    ];
    expect(component.displayedColumns).toEqual(expectedColumns);
  });

  it('should initialize dataSource as MatTableDataSource', () => {
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
  });

  describe('getCertificationsDetails', () => {
    it('should set loading to true when fetching data', () => {
      component.currentFieldId = '123';
      component.getCertificationsDetails('123');
      expect(component.loading).toBeTruthy();
    });

    it('should fetch data and update dataSource', (done) => {
      component.currentFieldId = '123';
      component.getCertificationsDetails('123');

      // Allow subscription to complete
      setTimeout(() => {
        expect(component.dataSource.data).toEqual(mockInspectionData);
        expect(component.loading).toBeFalsy();
        expect(changeDetectorRefMock.markForCheck).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$ subject', () => {
      const nextSpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('delete method', () => {
    it('should throw error when called', () => {
      expect(() => component.delete({} as any)).toThrow('Method not implemented.');
    });
  });

  describe('edit method', () => {
    it('should be defined but not throw error', () => {
      expect(() => component.edit({} as any)).not.toThrow();
    });
  });
});
