/**
 * Grid Column chooser spec document
 */
import { EmitType, createElement } from '@syncfusion/ej2-base';
import { Grid } from '../../../src/grid/base/grid';
import { Page } from '../../../src/grid/actions/page';
import { Toolbar } from '../../../src/grid/actions/toolbar';
import { data } from '../base/datasource.spec';
import { Freeze } from '../../../src/grid/actions/freeze';
import { ColumnChooser } from '../../../src/grid/actions/column-chooser';
import { createGrid, destroy } from '../base/specutil.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';

Grid.Inject(Page, Toolbar, ColumnChooser, Freeze);
describe('Column chooser module', () => {
    describe('Column chooser testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity' }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('Column chooser testing', (done: Function) => {
            beforeOpenColumnChooser = (args?: { element: Element }): void => {
                expect(args.element.querySelectorAll('.e-columnchooser-btn').length).toBe(1);
                done();
            };
            beforeOpenColumnChooser = (args?: { element: Element }): void => {
                expect(args.element.querySelectorAll('.e-ccdlg').length).toBe(1);
                done();
            };
            gridObj.beforeOpenColumnChooser = beforeOpenColumnChooser;

            gridObj.element.classList.add('e-device');
            setTimeout(() => {
                (<HTMLElement>gridObj.toolbarModule.getToolbar().querySelector('#Grid_columnchooser')).click();
                (<any>gridObj).isDestroyed = true;
                (<any>gridObj).columnChooserModule.addEventListener();
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).isDestroyed = false;
                (<any>gridObj).columnChooserModule.removeEventListener();
                (<any>gridObj).destroy();
            }, 500);
        });

        afterAll(() => {
            elem.remove();
        });
    });

    describe('Column chooser event testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity' }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('Column chooser render testing', (done: Function) => {
            beforeOpenColumnChooser = (args?: any): void => {
                expect(args.requestType).toBe('beforeOpenColumnChooser');
                expect(args.columns.length).toBe(5);
                done();
            };

            gridObj.beforeOpenColumnChooser = beforeOpenColumnChooser;
            setTimeout(() => {
                (<HTMLElement>gridObj.toolbarModule.getToolbar().querySelector('#Grid_columnchooser')).click();
                (<any>gridObj).columnChooserModule.isDlgOpen = true;
                (<HTMLElement>gridObj.toolbarModule.getToolbar().querySelector('#Grid_columnchooser')).click();
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
            }, 500);
        });

        afterAll(() => {
            elem.remove();
        });
    });

    describe('Column chooser Custom testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity' }],
                    allowPaging: true,
                    showColumnChooser: true,
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('Column chooser open  testing', (done: Function) => {
            beforeOpenColumnChooser = (args?: any): void => {
                expect(args.requestType).toBe('beforeOpenColumnChooser');
                expect(args.columns.length).toBe(5);
                done();
            };

            gridObj.beforeOpenColumnChooser = beforeOpenColumnChooser;

            setTimeout(() => {
                gridObj.columnChooserModule.openColumnChooser();
                (<HTMLElement>gridObj.element.querySelectorAll('.e-rowcell')[0]).click();
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
                done();
            }, 1000);
        });

        afterAll(() => {
            elem.remove();
        });
    });

    describe('column chooser search', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity' }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('coverage', (done: Function) => {
            setTimeout(() => {
                gridObj.columnChooserModule.openColumnChooser();
                (gridObj.columnChooserModule as any).columnChooserSearch('e');
                (<HTMLElement>gridObj.element.querySelector('.e-cc-cancel')).click();
                (<HTMLElement>gridObj.element.querySelector('.e-cc_okbtn')).click();
                gridObj.columnChooserModule.openColumnChooser();
                (gridObj.columnChooserModule as any).columnChooserSearch('ghgh');
                (<HTMLElement>gridObj.element.querySelector('.e-cc-cnbtn')).click();
                gridObj.columnChooserModule.openColumnChooser();
                (gridObj.columnChooserModule as any).columnChooserSearch('');
                (<HTMLElement>gridObj.element.querySelector('.e-cc_okbtn')).click();
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
                done();
            }, 500);

        });
        afterAll(() => {
            elem.remove();
        });

    });

    describe('column chooser manual search', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight', visible: false },
                    { field: 'ShipCity' }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('column chooser manual search', (done: Function) => {
            setTimeout(() => {
                gridObj.columnChooserModule.openColumnChooser();
                let value: any;
                let target: Object;
                let keycode: number = 13;
                let e: Object;
                e = { target: { value: 'ddc' } };
                (gridObj.columnChooserModule as any).columnChooserManualSearch(e);
                (<HTMLElement>gridObj.element.querySelector('.e-cc_okbtn')).click();
                e = { target: { value: 'ddc' }, keycode: 13 };
                (gridObj.columnChooserModule as any).columnChooserManualSearch(e);
                gridObj.columnChooserModule.openColumnChooser(100, 100);
                (<any>gridObj).columnChooserModule.confirmDlgBtnClick();
                (gridObj.columnChooserModule as any).columnChooserManualSearch(e);
                let searchElement = gridObj.element.querySelector('.e-ccsearch');
                (<any>gridObj).columnChooserModule.searchFocus(searchElement);
                (<any>gridObj).columnChooserModule.searchBlur(searchElement);
                // (<any>gridObj).columnChooserModule.columnChooserSearch('e');
                // (<any>gridObj).columnChooserModule.startTime({keycode: 13});
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
                done();
            }, 500);

        });
        afterAll(() => {
            elem.remove();
        });

    });

    describe('column chooser checkstate', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID' }, { field: 'CustomerID', visible: false },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity', showInColumnChooser: false }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('change checkstate', (done: Function) => {
            setTimeout(() => {
                gridObj.columnChooserModule.openColumnChooser();
                let cheEle: any = gridObj.element.querySelectorAll('.e-cc-chbox')[0];
                let cheEle1: any = gridObj.element.querySelectorAll('.e-cc-chbox')[1];
                cheEle.click();
                cheEle1.click();
                (<HTMLElement>gridObj.element.querySelector('.e-cc_okbtn')).click();
                gridObj.columnChooserModule.openColumnChooser();
                gridObj.columnChooserModule.openColumnChooser();
                done();
            }, 500);

        });
        it('change checkstate on focus out', (done: Function) => {
            gridObj.columnChooserModule.openColumnChooser();
            let cheEle: any = gridObj.element.querySelectorAll('.e-cc-chbox')[0];
            let cheEle1: any = gridObj.element.querySelectorAll('.e-cc-chbox')[1];
            let checkbox1state = cheEle.checked;
            let checkbox2state = cheEle1.checked;
            cheEle.click();
            cheEle1.click();
            (<HTMLElement>gridObj.element).click();
            gridObj.columnChooserModule.openColumnChooser();
            gridObj.columnChooserModule.openColumnChooser();
            cheEle = gridObj.element.querySelectorAll('.e-cc-chbox')[0];
            cheEle1 = gridObj.element.querySelectorAll('.e-cc-chbox')[1];
            expect(cheEle.checked).toBe(checkbox1state);
            expect(cheEle1.checked).toBe(checkbox2state);
            done();
        });

        afterAll(() => {
            (<any>gridObj).columnChooserModule.destroy();
            (<any>gridObj).destroy();
            elem.remove();
        });

    });

    describe('column chooser checkstate with Freeze pane', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    frozenColumns: 2,
                    frozenRows: 2,
                    dataSource: data,
                    columns: [{ field: 'OrderID' }, { field: 'CustomerID', visible: false },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity', showInColumnChooser: false }],
                    allowPaging: true,
                    showColumnChooser: true,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('change checkstate with Freeze pane', (done: Function) => {
            setTimeout(() => {
                gridObj.columnChooserModule.openColumnChooser();
                let cheEle: any = gridObj.element.querySelectorAll('.e-cc-chbox')[0];
                let cheEle1: any = gridObj.element.querySelectorAll('.e-cc-chbox')[1];
                cheEle.click();
                cheEle1.click();
                (<HTMLElement>gridObj.element.querySelector('.e-cc_okbtn')).click();
                gridObj.columnChooserModule.openColumnChooser();
                gridObj.columnChooserModule.openColumnChooser();
                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
                done();
            }, 500);

        });
        afterAll(() => {
            elem.remove();
        });
    });

    describe('Column chooser rtl testing', () => {
        let gridObj: Grid;
        let elem: HTMLElement = createElement('div', { id: 'Grid' });
        let beforeOpenColumnChooser: () => void;
        let actionComplete: Function;

        beforeAll((done: Function) => {
            let dataBound: EmitType<Object> = () => { done(); };
            document.body.appendChild(elem);
            gridObj = new Grid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', showInColumnChooser: false }, { field: 'CustomerID' },
                    { field: 'EmployeeID' }, { field: 'Freight' },
                    { field: 'ShipCity', visible: false }],
                    allowPaging: true,
                    toolbar: ['columnchooser'],
                    showColumnChooser: true,
                    pageSettings: { pageSize: 5 },
                    enableRtl: true,
                    beforeOpenColumnChooser: beforeOpenColumnChooser,
                    dataBound: dataBound
                });
            gridObj.appendTo('#Grid');
        });
        it('rtl', (done: Function) => {
            let x: number = 100;
            let y: number = 100;
            let target: HTMLElement;
            let e: Object;
            gridObj.element.classList.add('e-bigger');
            setTimeout(() => {
                (<HTMLElement>gridObj.toolbarModule.getToolbar().querySelector('#Grid_columnchooser')).click();
                (<any>gridObj).columnChooserModule.openColumnChooser(x, y);
                (<any>gridObj).columnChooserModule.openColumnChooser();
                let sel: HTMLElement = (<any>gridObj).element.querySelector('.e-columnchooser-btn');
                e = { target: sel };
                (<any>gridObj).initialOpenDlg = false;
                (<any>gridObj).isDlgOpen = true;
                (<any>gridObj).columnChooserModule.clickHandler(e);
                (<any>gridObj).columnChooserModule.clickHandler(e);
                (<any>gridObj).columnChooserModule.openColumnChooser();
                let ele: HTMLElement = (<any>gridObj).element.querySelectorAll('.e-cc-chbox')[0];
                e = { event: { target: ele }, value: true };
                (<any>gridObj).columnChooserModule.checkstatecolumn(e);
                let ele1: HTMLElement = (<any>gridObj).element.querySelectorAll('.e-cc-chbox')[3];
                e = { event: { target: ele1 }, value: true };
                (<any>gridObj).columnChooserModule.checkstatecolumn(e);
                ele.click();
                e = { event: { target: ele }, value: false };
                (<any>gridObj).columnChooserModule.checkstatecolumn(e);
                ele1.click();
                e = { event: { target: ele }, value: false };
                (<any>gridObj).columnChooserModule.checkstatecolumn(e);

                (<any>gridObj).columnChooserModule.destroy();
                (<any>gridObj).destroy();
                done();
            }, 1000);
        });

        afterAll(() => {
            elem.remove();
        });
    });
    describe('Colum chooser enable throw set model => ', () => {
        let gridObj: Grid;
        let beforeOpenColumnChooser: () => void;
        let columns: any;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: data,
                    columns: [{ field: 'OrderID', headerText: 'Order ID' },
                    { field: 'CustomerID', headerText: 'CustomerID' },
                    { field: 'EmployeeID', headerText: 'Employee ID' },
                    { field: 'Freight', headerText: 'Freight' },
                    { field: 'ShipCity', headerText: 'Ship City' },
                    { field: 'ShipCountry', headerText: 'Ship Country' }],
                    showColumnChooser: false,
                    toolbar: ['columnchooser'],
                    pageSettings: { pageSize: 5 },
                }, done);
        });
        it('Colum chooser enable throw set model', () => {
            gridObj.showColumnChooser = true;
            gridObj.dataBind();
            gridObj.columnChooserModule.openColumnChooser();
            expect(gridObj.element.querySelectorAll('.e-ccdlg').length).toBe(1);
        });
        afterAll(() => {
            destroy(gridObj);
        });
    });

});