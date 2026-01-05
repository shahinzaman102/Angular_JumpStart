import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { CustomPipe } from './custom-pipe';

describe('CustomPipe', () => {
    let component: CustomPipe;
    let fixture: ComponentFixture<CustomPipe>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CustomPipe],
            providers: [
                provideHttpClientTesting(),
                provideRouter([])
            ]
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(CustomPipe);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // handle multiple requests
        const requests = httpMock.match('/heroes.json');
        requests.forEach(req => req.flush([])); // respond to all requests

        expect(component).toBeTruthy();
    });

    afterEach(() => {
        httpMock.verify(); // ensure no pending HTTP calls
    });
});
