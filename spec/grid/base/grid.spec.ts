/**
 * Grid base spec 
 */
import { L10n, EmitType } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { Grid } from '../../../src/grid/base/grid';
import { GridLine } from '../../../src/grid/base/enum';
import { Column } from '../../../src/grid/models/column';
import { Page } from '../../../src/grid/actions/page';
import { data, filterData } from '../base/datasource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';

Grid.Inject(Page);

describe('Grid base module', () => {
    describe('Grid properties', () => {
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
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    enableHover: false,
                    dataBound: dataBound,
                    actionComplete: actionComplete,
                });
            gridObj.appendTo('#Grid');
        });

        it('enable RTL testing', () => {
            gridObj.enableRtl = true;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-rtl')).toBeTruthy();
        });

        it('disable RTL testing', () => {
            gridObj.enableRtl = false;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-rtl')).toBeFalsy();
        });

        it('enable row hover testing', () => {
            gridObj.enableHover = true;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-gridhover')).toBeTruthy();
        });

        it('disable row hover testing', () => {
            gridObj.enableHover = false;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-gridhover')).toBeFalsy();
        });

        it('Row count testing', () => {
            expect(gridObj.element.querySelectorAll('.e-row').length).toBe(data.length);
        });

        it('Column count testing', () => {
            expect(gridObj.element.querySelectorAll('.e-headercell').length).toBe(gridObj.getColumns().length);
        });
        it('Content cell count testing', () => {
            expect(gridObj.element.querySelectorAll('.e-row')[0].childNodes.length).toBe(gridObj.getColumns().length);
        });

        // it('datasource onproperty changed testing', (done: Function) => {
        //     actionComplete = (args: Object): void => {
        //         expect(gridObj.element.querySelectorAll('.e-row').length).toBe(15);
        //         done();
        //     };
        //     gridObj.dataBound = actionComplete;
        //     gridObj.dataSource = filterData;
        //     gridObj.dataBind();
        // });

        it('Disable altrow', (done: Function) => {
            let dataBound = (args: Object) => {
                expect(gridObj.getContent().querySelectorAll('.e-altrow').length).toBe(0);
                done();
            };
            gridObj.dataBound = dataBound;
            gridObj.enableAltRow = false;
            gridObj.dataBind();
        });
        it('enable altrow', (done: Function) => {
            let dataBound = (args: Object) => {
                expect(gridObj.getContent().querySelectorAll('.e-altrow').length).toBe(Math.floor(gridObj.currentViewData.length / 2));
                done();
            };
            gridObj.dataBound = dataBound;
            gridObj.enableAltRow = true;
            gridObj.dataBind();
        });

        afterAll(() => {
            remove(elem);
        });

    });

    describe('Allow resizing test cases', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let colHeader: Element;
        let content: Element;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowTextWrap: true,
                    dataBound: dataBound,
                    allowResizing: true
                });
            gridObj.appendTo('#Grid');
        });

        it('handlers added', () => {
            expect(gridObj.element.querySelectorAll('.e-rhandler').length).toBe(5);
        });

        it('property change reflect', () => {
            gridObj.allowResizing = false;
            gridObj.dataBind();
            expect(gridObj.element.querySelectorAll('.e-rhandler').length).toBe(0);
            gridObj.allowResizing = true;
            gridObj.dataBind();
            expect(gridObj.element.querySelectorAll('.e-rhandler').length).toBe(5);
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('Allow resizing - columns', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let colHeader: Element;
        let content: Element;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID', allowResizing: false },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID', allowResizing: false },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowTextWrap: true,
                    dataBound: dataBound,
                    allowResizing: true
                });
            gridObj.appendTo('#Grid');
        });

        it('Column resize suppress', () => {
            expect(gridObj.element.querySelectorAll('.e-rhandler').length).toBe(3);
            expect(gridObj.element.querySelectorAll('.e-rsuppress').length).toBe(2);

        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('Method testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let actionComplete: (e?: Object) => void;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, actionComplete: actionComplete, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('getRowByIndex testing', () => {
            expect(isNullOrUndefined(gridObj.getRowByIndex(1))).toBeFalsy();
        });

        it('getHeaderContent testing', () => {
            expect(isNullOrUndefined(gridObj.getHeaderContent())).toBeFalsy();
        });

        it('getContentTable testing', () => {
            expect(isNullOrUndefined(gridObj.getContentTable())).toBeFalsy();
        });

        it('getContent testing', () => {
            expect(isNullOrUndefined(gridObj.getContent())).toBeFalsy();
        });

        it('getHeaderTable testing', () => {
            expect(isNullOrUndefined(gridObj.getHeaderTable())).toBeFalsy();
        });

        it('setGridHeaderContent testing', () => {
            let element: Element = gridObj.getHeaderContent();
            gridObj.setGridHeaderContent(element);
            expect(gridObj.getHeaderContent().isEqualNode(element)).toBeTruthy();
        });

        it('setGridContentTable testing', () => {
            let element: Element = gridObj.getContentTable();
            gridObj.setGridContentTable(element);
            expect(gridObj.getContentTable().isEqualNode(element)).toBeTruthy();
        });

        it('setGridContent testing', () => {
            let element: Element = gridObj.getContent();
            gridObj.setGridContent(element);
            expect(gridObj.getContent().isEqualNode(element)).toBeTruthy();
        });

        it('setGridHeaderTable testing', () => {
            let element: Element = gridObj.getHeaderTable();
            gridObj.setGridHeaderTable(element);
            expect(gridObj.getHeaderTable().isEqualNode(element)).toBeTruthy();
        });

        it('getColumnByField testing', () => {
            let col: Column = gridObj.getColumnByField('OrderID');
            expect(col.field).toBe('OrderID');
        });

        it('getColumnIndexByField testing', () => {
            let col: number = gridObj.getColumnIndexByField('OrderID');
            expect(col).toBe(0);
            let col1: number = gridObj.getColumnIndexByField('OrderID1');
            expect(col1).toBe(-1);
        });

        it('getColumnIndexByUid testing', () => {
            let col: number = gridObj.getColumnIndexByUid(gridObj.getColumnByField('OrderID').uid);
            expect(col).toBe(0);
            col = gridObj.getColumnIndexByUid(gridObj.getColumnByField('OrderID').uid + 'test');
            expect(col).toBe(-1);
        });

        it('getUidByColumnField testing', () => {
            expect(gridObj.getUidByColumnField('OrderID')).toBe(gridObj.getColumnByField('OrderID').uid);
        });

        it('getColumnHeaderByIndex testing', () => {
            expect(gridObj.getColumnHeaderByIndex(1).querySelector('.e-headercelldiv').textContent).toBe('CustomerID');
        });

        it('renderEmptyRow testing', () => {
            gridObj.renderModule.renderEmptyRow();
            expect(gridObj.element.querySelectorAll('.e-row').length).toBe(0);
            expect(gridObj.element.querySelectorAll('.e-emptyrow').length).toBe(1);
        });


        afterAll(() => {
            gridObj.getPersistData();
            remove(elem);
        });
    });

    describe('Grid lines testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let header: Element;
        let content: Element;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    gridLines: 'both',
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Grid line both testing', () => {
            expect(gridObj.element.classList.contains('e-horizontallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-verticallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-hidelines')).toBeFalsy();
        });

        it('Grid line horizontal testing', () => {
            gridObj.gridLines = 'horizontal';
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-horizontallines')).toBeTruthy();
            expect(gridObj.element.classList.contains('e-verticallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-hidelines')).toBeFalsy();
        });

        it('Grid line vertical testing', () => {
            gridObj.gridLines = 'vertical';
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-horizontallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-verticallines')).toBeTruthy();
            expect(gridObj.element.classList.contains('e-hidelines')).toBeFalsy();
        });

        it('Grid line hide both testing', () => {
            gridObj.gridLines = 'none';
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-horizontallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-verticallines')).toBeFalsy();
            expect(gridObj.element.classList.contains('e-hidelines')).toBeTruthy();
        });

        afterAll(() => {
            remove(elem);
        });
    });


    describe('Grid lines testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let colHeader: Element;
        let content: Element;
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    allowTextWrap: true,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('Text wrap testing', () => {
            expect(gridObj.element.classList.contains('e-wrap')).toBeTruthy();
        });

        it('Text wrap false testing', () => {
            gridObj.allowTextWrap = false;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-wrap')).toBeFalsy();
        });

        it('Text wrap false testing', () => {
            gridObj.allowTextWrap = true;
            gridObj.dataBind();
            expect(gridObj.element.classList.contains('e-wrap')).toBeTruthy();
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('Localization testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });

        beforeAll((done: Function) => {
            L10n.load({
                'de-DE': {
                    'grid': {
                        EmptyRecord: 'Geen records om te laten zien'
                    }
                }
            });
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, locale: 'de-DE', allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });

        it('renderEmptyRow testing', () => {
            gridObj.renderModule.renderEmptyRow();
            expect(gridObj.element.querySelectorAll('.e-row').length).toBe(0);
            expect(gridObj.element.querySelectorAll('.e-emptyrow').length).toBe(1);
        });

        it('renderEmptyRow content testing', () => {
            expect(gridObj.element.querySelector('.e-emptyrow').textContent).toBe('Geen records om te laten zien');
        });

        it('get constant method testing', () => {
            expect(gridObj.localeObj.getConstant('True')).toBe('true');
        });

        it('get constant method testing', () => {
            expect(gridObj.localeObj.getConstant('EmptyRecord')).toBe('Geen records om te laten zien');
            //for coverage 
            gridObj.refreshHeader();
            gridObj.refresh();
            gridObj.setInjectedModules([]);
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('media columns testing', () => {
        let gridObj: Grid;
        let targetEle: {};
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });


        it('media columns', () => {
            (<any>gridObj).getMediaColumns();
            (<any>gridObj).isInitialLoad = true;
            let mediaqry: any = window.matchMedia('(min-width:500px)');
            gridObj.mediaQueryUpdate(0, mediaqry);
            let mediaqry1: any = window.matchMedia('(max-width:1300px)');
            gridObj.mediaQueryUpdate(1, mediaqry);
            let ele: Element = gridObj.element;
            let e: any = { target: ele };
            (<any>gridObj).focusOutHandler(e);

        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('Dynamic columns change testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });


        it('Change Columns', (done: Function) => {
            gridObj.dataBound = () => {
                expect(gridObj.columns.length).toBe(3);
                expect(gridObj.getRows()[0].children.length).toBe(3);
                done();
            };
            expect(gridObj.columns.length).toBe(5);
            gridObj.columns = [
                { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
                { headerText: 'CustomerID', field: 'CustomerID' },
                { headerText: 'EmployeeID', field: 'EmployeeID' },
            ];
            gridObj.dataBind();
        });

        it('Change Columns using push method', (done: Function) => {
            gridObj.dataBound = () => {
                // expect(gridObj.columns.length).toBe(5);
                // expect(gridObj.getRows()[0].children.length).toBe(5);
                done();
            };
            expect(gridObj.columns.length).toBe(3);
            let newcol: Column[] = <Column[]>[{ headerText: 'ShipCountry', field: 'ShipCountry' },
            { headerText: 'ShipCity', field: 'ShipCity' },];
            (<any>gridObj.columns).push(...newcol);
            gridObj.dataBind();
            gridObj.refreshColumns();
        });

        it('Change Columns using pop method', (done: Function) => {
            gridObj.dataBound = () => {
                expect(gridObj.columns.length).toBe(4);
                expect(gridObj.getRows()[0].children.length).toBe(4);
                done();
            };
            expect(gridObj.columns.length).toBe(5);
            (<any>gridObj.columns).pop();
            gridObj.dataBind();
            gridObj.refreshColumns();
        });

        it('Spinner showing test', (done: Function) => {
            gridObj.dataBound = () => {
                expect(gridObj.element.querySelector('.e-spinner-pane').classList.contains('e-spin-show')).toBeTruthy();
                done();
            };
            gridObj.refresh();
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('media columns testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });


        it('getDataModule tets', () => {
            let gdata = gridObj.getDataModule();
        });

        afterAll(() => {
            remove(elem);
        });
    });

    describe('row Information', () => {

        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data, allowPaging: false,
                    columns: [
                        { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
                        { headerText: 'CustomerID', field: 'CustomerID' },
                        { headerText: 'EmployeeID', field: 'EmployeeID' },
                        { headerText: 'ShipCountry', field: 'ShipCountry' },
                        { headerText: 'ShipCity', field: 'ShipCity' },
                    ],
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });


        it('get row information', () => {

           // let gdata = gridObj.getRowInfo(document.getElementsByClassName('e-rowcell')[9]);
            //let gdata1 = gridObj.getRowInfo(document.getElementsByClassName('e-groupcaption')[0]);
            //expect(gdata.rowData['EmployeeID']).toBe(6);
        });

        afterAll(() => {
            remove(elem);
        });

    })

    // describe('media columns testing', () => {
    //     let gridObj: Grid;
    //     let elem: HTMLElement = createElement('div', { id: 'Grid' });
    //     beforeAll((done: Function) => {
    //         let dataBound: EmitType<Object> = () => { done(); };
    //         document.body.appendChild(elem);
    //         gridObj = new Grid(
    //             {
    //                 dataSource: data, allowPaging: false,
    //                 columns: [
    //                     { headerText: 'OrderID', field: 'OrderID', hideAtMedia: '(min-width:500px)' },
    //                     { headerText: 'CustomerID', field: 'CustomerID' },
    //                     { headerText: 'EmployeeID', field: 'EmployeeID' },
    //                     { headerText: 'ShipCountry', field: 'ShipCountry' },
    //                     { headerText: 'ShipCity', field: 'ShipCity' },
    //                 ],
    //                 dataBound: dataBound
    //             });
    //         gridObj.appendTo('#Grid');
    //     });


    //     it('getDataModule tets', () => {
    //        let gdata = gridObj.getDataModule();
    //     });

    //     afterAll(() => {
    //         remove(elem);
    //     });
    // });

});

