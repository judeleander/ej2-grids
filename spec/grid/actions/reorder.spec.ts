/**
 * Grid Reordering spec document
 */
import { Browser, EventHandler, EmitType } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { SortDirection } from '../../../src/grid/base/enum';
import { DataManager } from '@syncfusion/ej2-data';
import { Grid } from '../../../src/grid/base/grid';
import { getActualProperties, parentsUntil } from '../../../src/grid/base/util';
import { Column } from '../../../src/grid/models/column';
import { Sort } from '../../../src/grid/actions/sort';
import { Filter } from '../../../src/grid/actions/filter';
import { Group } from '../../../src/grid/actions/group';
import { Page } from '../../../src/grid/actions/page';
import { Reorder } from '../../../src/grid/actions/reorder';
import { data } from '../base/datasource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';

Grid.Inject(Sort, Page, Filter, Reorder, Group);

function copyObject(source: Object, destiation: Object): Object {
    for (let prop in source) {
        destiation[prop] = source[prop];
    }
    return destiation;
}

function getEventObject(eventType: string, eventName: string, target?: Element, x?: number, y?: number): Object {
    let tempEvent: any = document.createEvent(eventType);
    tempEvent.initEvent(eventName, true, true);
    let returnObject: any = copyObject(tempEvent, {});
    returnObject.preventDefault = () => { return true; };

    if (!isNullOrUndefined(x)) {
        returnObject.pageX = x;
        returnObject.clientX = x;
    }
    if (!isNullOrUndefined(y)) {
        returnObject.pageY = y;
        returnObject.clientY = y;
    }
    if (!isNullOrUndefined(target)) {
        returnObject.target = returnObject.srcElement = returnObject.toElement = returnObject.currentTarget = target;
    }

    return returnObject;
}

describe('Reorder module', () => {

    describe('Reorder functionalities', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let dataBound: Function;
        let actionComplete: (e?: Object) => void;
        let headers: any;
        let columns: Column[];
        window['browserDetails'].isIE = false;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    allowSorting: true,
                    allowReordering: true,
                    columns: [{ field: 'OrderID' }, { field: 'CustomerID' }, { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity' }],
                    allowFiltering: true,
                    actionComplete: actionComplete,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Reorder Column method testing', (done: Function) => {
            let dataBound = (args: Object): void => {
                columns = gridObj.getColumns() as Column[];
                headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
                expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('EmployeeID');
                expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
                expect(headers[2].querySelector('.e-headercelldiv').textContent).toEqual('CustomerID');
                expect(columns[0].field).toEqual('EmployeeID');
                expect(columns[1].field).toEqual('OrderID');
                expect(columns[2].field).toEqual('CustomerID');
                done();
            };
            gridObj.dataBound = dataBound;
            gridObj.dataBind();
            gridObj.reorderColumns('EmployeeID', 'OrderID');
        });

        it('Reorder Invalid Column testing', () => {
            gridObj.reorderColumns('EmployeeID', 'EmployeeID1');
            headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
            expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('EmployeeID');
            expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
            expect(columns[0].field).toEqual('EmployeeID');
            expect(columns[1].field).toEqual('OrderID');
        });

        it('Reorder same Column testing', () => {
            gridObj.reorderColumns('EmployeeID', 'EmployeeID');
            headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
            expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('EmployeeID');
            expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
            expect(columns[0].field).toEqual('EmployeeID');
            expect(columns[1].field).toEqual('OrderID');
        });

        it('Reorder Column simulate testing', (done: Function) => {
            let dataBound = (args: Object): void => {
                columns = gridObj.getColumns() as Column[];
                headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
                expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
                expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('EmployeeID');
                expect(columns[0].field).toEqual('OrderID');
                expect(columns[1].field).toEqual('EmployeeID');
                done();
            };
            gridObj.dataBound = dataBound;
            gridObj.dataBind();

            let mousedown: any = getEventObject('MouseEvents', 'mousedown', headers[0].querySelector('.e-headercelldiv'), 13, 13);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);

            let mousemove: any = getEventObject('MouseEvents', 'mousemove', headers[0], 27, 14);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = gridObj.getContentTable(); //cursor testing
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = document.body; //outside move testing
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = headers[1];
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            let mouseup: any = getEventObject('MouseEvents', 'mouseup', headers[1], 198, 13);
            EventHandler.trigger(<any>(document), 'mouseup', mouseup);
        });


        it('Reorder disable and enable testing', (done: Function) => {
            let dataBound = (args: Object): void => {
                columns = gridObj.getColumns() as Column[];
                headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
                expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
                expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('ShipCity');
                expect(headers[2].querySelector('.e-headercelldiv').textContent).toEqual('EmployeeID');
                expect(headers[4].querySelector('.e-headercelldiv').textContent).toEqual('Freight');
                expect(columns[0].field).toEqual('OrderID');
                expect(columns[1].field).toEqual('ShipCity');
                expect(columns[2].field).toEqual('EmployeeID');
                expect(columns[4].field).toEqual('Freight');
                //for coverage
                getActualProperties({});
                parentsUntil(headers[0], 'e-headercell', false);
                parentsUntil(headers[0], 'Grid', true);
                done();
            };
            gridObj.allowReordering = false;
            gridObj.dataBind();
            gridObj.allowReordering = true;
            gridObj.dataBind();
            gridObj.dataBound = dataBound;
            gridObj.dataBind();
            gridObj.reorderColumns('ShipCity', 'EmployeeID');
        });

        it('Reorder Column simulate testing', () => {

            let mousedown: any = getEventObject('MouseEvents', 'mousedown', headers[0].querySelector('.e-headercelldiv'), 13, 13);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);
            gridObj.allowReordering = false;
            gridObj.dataBind();
            let mousemove: any = getEventObject('MouseEvents', 'mousemove', headers[0], 14, 14);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = headers[1];
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            let mouseup: any = getEventObject('MouseEvents', 'mouseup', headers[1], 198, 13);
            EventHandler.trigger(<any>(document), 'mouseup', mouseup);
            gridObj.allowReordering = true;
            gridObj.dataBind();
        });

        // it('Reorder Column simulate from headercelldiv testing', (done: Function) => {
        //     dataBound = (args: Object): void => {
        //         headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
        //         expect(headers[0].querySelector('.e-headercelldiv').textContent).toEqual('ShipCity');
        //         expect(headers[1].querySelector('.e-headercelldiv').textContent).toEqual('OrderID');
        //         expect(columns[0].field).toEqual('ShipCity');
        //         expect(columns[1].field).toEqual('OrderID');
        //         done();
        //     };
        //     gridObj.dataBound = dataBound;
        //     gridObj.dataBind();

        //     headers = gridObj.getHeaderContent().querySelectorAll('.e-headercell');
        //     let mousedown: any = getEventObject('MouseEvents', 'mousedown', headers[0].querySelector('.e-headercelldiv'), 13, 13);
        //     (gridObj.getHeaderContent() as any).__eventList.events[(gridObj.getHeaderContent() as any).__eventList.events.length - 1].debounce.call(gridObj, mousedown);
        //     // EventHandler.trigger(gridObj.getHeaderContent() as HTMLElement, 'mousedown', mousedown);

        //     let mousemove: any = getEventObject('MouseEvents', 'mousemove', headers[0].querySelector('.e-headercelldiv'));
        //     EventHandler.trigger(<any>(document), 'mousemove', mousemove);
        //     mousemove.srcElement = mousemove.target = mousemove.toElement = headers[1].querySelector('.e-headercelldiv');
        //     EventHandler.trigger(<any>(document), 'mousemove', mousemove);

        //     let mouseup: any = getEventObject('MouseEvents', 'mouseup', headers[1], 198, 13);
        //     EventHandler.trigger(<any>(document), 'mouseup', mouseup);
        // });

        it('Reorder Column simulate invalid drop element testing', () => { //for coverage                      
            let mousedown: any = getEventObject('MouseEvents', 'mousedown', gridObj.element, 13, 13);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);

            let mousemove: any = getEventObject('MouseEvents', 'mousemove', gridObj.element, 27, 14);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);

            mousedown = getEventObject('MouseEvents', 'mousedown', headers[0], 13, 13);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);
            mousemove = getEventObject('MouseEvents', 'mousemove', headers[0].querySelector('.e-headercelldiv'), 27, 14);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = headers[1].querySelector('.e-headercelldiv');
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);

            let mouseup: any = getEventObject('MouseEvents', 'mouseup', gridObj.getHeaderContent(), 198, 13);
            EventHandler.trigger(<any>(document), 'mouseup', mouseup);
            gridObj.allowReordering = false;
            gridObj.dataBind();
            mousedown = getEventObject('MouseEvents', 'mousedown', gridObj.element, 13, 13);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);
            mousemove = getEventObject('MouseEvents', 'mousemove', headers[0].querySelector('.e-headercelldiv'), 27, 14);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mousemove.srcElement = mousemove.target = mousemove.toElement = headers[1].querySelector('.e-headercelldiv');
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            mouseup = getEventObject('MouseEvents', 'mouseup', gridObj.getHeaderContent(), 198, 13);
            EventHandler.trigger(<any>(document), 'mouseup', mouseup);
            gridObj.allowReordering = true;
            gridObj.dataBind();

            //for coverage                        
            (<any>gridObj.reorderModule).enableAfterRender({ module: 'sort' });
            headers[3].classList.add('e-reorderindicate');
            gridObj.element.appendChild(createElement('div', { className: 'e-cloneproperties' }));
            (<any>gridObj.getHeaderContent()).ej2_instances[0].trigger('drop', { target: createElement('div'), 
            droppedElement: gridObj.element.querySelector('.e-cloneproperties') }); //droppable instance
            gridObj.element.appendChild(createElement('div', { className: 'e-cloneproperties' }));
            gridObj.width = 300;
            gridObj.dataBind();
            (<any>gridObj.reorderModule).updateScrollPostion({ clientX: 10, clientY: 10 });
            (<any>gridObj.reorderModule).updateScrollPostion({ clientX: gridObj.element.getBoundingClientRect().right - 20, clientY: 10 });
            (<any>gridObj.reorderModule).updateScrollPostion({ changedTouches: [{ clientX: 10, clientY: 10 }] });
            gridObj.allowGrouping = true;
            let header: any = headers[2];
            (<any>gridObj.reorderModule).element = header.parentElement;
            (<any>gridObj.reorderModule).drag({ target: header, event: { clientX: 55, clientY: 10 } });
            gridObj.isDestroyed = true;
            gridObj.reorderModule = new Reorder(gridObj);

        });


        afterAll(() => {
            remove(elem);
        });
    });

    //reOrder stacked header 
    describe('Stacked header Reordering', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let actionComplete: (e?: Object) => void;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        {
                            headerText: 'Order Details', toolTip: 'Order Details',
                            columns: [{ field: 'OrderID', headerText: 'Order ID' },
                            { field: 'OrderDate', headerText: 'Order Date', format: { skeleton: 'yMd', type: 'date' }, type: 'date' }]
                        },
                        { field: 'CustomerID', headerText: 'Customer ID' },
                        { field: 'EmployeeID', headerText: 'Employee ID' },
                        {
                            headerText: 'Ship Details',
                            columns: [
                                { field: 'ShipCity', headerText: 'Ship City' },
                                { field: 'ShipCountry', headerText: 'Ship Country' },
                                {
                                    headerText: 'Ship Name Verified', columns: [{ field: 'ShipName', headerText: 'Ship Name' },
                                    { field: 'Verified', headerText: 'Verified' }]
                                },
                            ],
                        }
                    ],
                    allowGrouping: true,
                    allowSorting: true,
                    allowReordering: true,
                    dataBound: dataBound,
                    actionComplete: actionComplete
                });
            gridObj.appendTo('#Grid');
        });

        it('Reordering the stackedheadercolumn', (done: Function) => { // reorder stacked header with grouping enabled
            let headers = gridObj.getHeaderContent().querySelectorAll('.e-stackedheadercell');
            actionComplete = () => {
                headers = gridObj.getHeaderContent().querySelectorAll('.e-stackedheadercell');
                expect(headers[1].innerHTML).toEqual('Order Details');
                expect(headers[0].innerHTML).toEqual('Ship Details');
                expect(gridObj.element.querySelectorAll('.e-cloneproperties').length).toEqual(0);
                done();
            };
            expect(headers[0].innerHTML).toEqual('Order Details');
            expect(headers[1].innerHTML).toEqual('Ship Details');
            let mousedown: any = getEventObject('MouseEvents', 'mousedown', headers[0], 50, 70);
            EventHandler.trigger(gridObj.getHeaderContent().querySelector('.e-columnheader') as HTMLElement, 'mousedown', mousedown);

            let mousemove: any = getEventObject('MouseEvents', 'mousemove', headers[0], 87, 74);
            EventHandler.trigger(<any>(document), 'mousemove', mousemove);
            let mouseup: any = getEventObject('MouseEvents', 'mouseup', headers[1], 198, 72);
            EventHandler.trigger(<any>(document), 'mouseup', mouseup);
            gridObj.actionComplete = actionComplete;
        });
        afterAll(() => {
            elem.remove();
        });
    });


});
