import { isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { formatUnit } from '@syncfusion/ej2-base/util';
import { columnWidthChanged } from '../base/constant';
import { Column } from '../models/column';
var ColumnWidthService = (function () {
    function ColumnWidthService(parent) {
        this.parent = parent;
    }
    ColumnWidthService.prototype.setWidthToColumns = function () {
        var _this = this;
        var i = 0;
        if (this.parent.allowGrouping) {
            for (var len = this.parent.groupSettings.columns.length; i < len; i++) {
                this.setColumnWidth(new Column({ width: '30px' }), i);
            }
        }
        if (this.parent.detailsTemplate || this.parent.childGrid) {
            this.setColumnWidth(new Column({ width: '30px' }), i);
        }
        this.parent.getColumns().forEach(function (column) {
            _this.setColumnWidth(column);
        });
    };
    ColumnWidthService.prototype.setColumnWidth = function (column, index) {
        var columnIndex = isNullOrUndefined(index) ? this.parent.getNormalizedColumnIndex(column.uid) : index;
        var cWidth = column.width;
        if (!isNullOrUndefined(cWidth)) {
            this.setWidth(cWidth, columnIndex);
            this.parent.notify(columnWidthChanged, { index: columnIndex, width: cWidth, column: column });
        }
    };
    ColumnWidthService.prototype.setWidth = function (width, index) {
        var header = this.parent.getHeaderTable();
        var content = this.parent.getContentTable();
        var fWidth = formatUnit(width);
        header.querySelector('colgroup').children[index].style.width = fWidth;
        content.querySelector('colgroup').children[index].style.width = fWidth;
    };
    ColumnWidthService.prototype.getSiblingsHeight = function (element) {
        var previous = this.getHeightFromDirection(element, 'previous');
        var next = this.getHeightFromDirection(element, 'next');
        return previous + next;
    };
    ColumnWidthService.prototype.getHeightFromDirection = function (element, direction) {
        var sibling = element[direction + 'ElementSibling'];
        var result = 0;
        while (sibling) {
            result += sibling.offsetHeight;
            sibling = sibling[direction + 'ElementSibling'];
        }
        return result;
    };
    return ColumnWidthService;
}());
export { ColumnWidthService };
