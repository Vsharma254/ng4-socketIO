import { TestBed, inject, async } from '@angular/core/testing';
import { XHRBackend, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DepartmentService } from './department.service';
import { Department } from '../model/department';

describe('Suite: Department service testing ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(
        {
            imports:[HttpModule],
            providers:[{provide:XHRBackend, useValue:MockBackend}]
        })
    });
    it('service should return department list with 3 items',
       async(inject([DepartmentService, XHRBackend], (deptService, mockBackend)=> {
            const mockData = Array<Department>();
            mockData.push({ deptName: "test1", deptID: 1 });
            mockData.push({ deptName: "test2", deptID: 2 });
            mockData.push({ deptName: "test3", deptID: 3 });
            mockBackend.connections.subscribe((connection) => 
            {
                connection.mockResponse(new Response(new ResponseOptions({body:JSON.stringify(mockData)})) );
            });
        })
    ));

});
