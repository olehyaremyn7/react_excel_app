import { Nullable } from '../../interfaces';
import { TableParts, ToolbarStyles, ToolbarStylesKeys } from '../../redux/reducers/excel/interface';
import { addCSS, createUID, modifyClassList, setTextContent, toPixels } from '../../utils';
import { TableCellPosition } from '../interfaces';
import { getCellRowIndex } from '../utils';

export class Cell {
  private static _SELECTED_CLASSNAME: string = 'selected';
  private _$el: Nullable<HTMLDivElement> = null;
  private _isSelected: boolean = false;
  private _value: string;
  private _width: number;
  readonly styles: ToolbarStyles;
  readonly TABLE_PART: TableParts = TableParts.CELL;
  readonly columnLetter: string;
  readonly column: number;
  readonly row: number;
  readonly id: string;

  constructor(column: number, row: number, columnLetter: string, value: string, width: number, styles: ToolbarStyles) {
    this.column = column;
    this.row = row;
    this.columnLetter = columnLetter;
    this._value = value;
    this._width = width;
    this.styles = styles;
    this.id = createUID();
  }

  private parse(value: string = ''): string {
    if (value.startsWith('=')) {
      try {
        return eval(value.slice(1));
      } catch {
        return value;
      }
    }

    return value;
  }

  public select(): void {
    if (this._isSelected) {
      modifyClassList(this._$el, [Cell._SELECTED_CLASSNAME], true);
    } else {
      this.focus();
      modifyClassList(this._$el, [Cell._SELECTED_CLASSNAME], false);
    }

    this._isSelected = !this._isSelected;
  }

  public applyStyles(style: ToolbarStyles): void {
    addCSS(this._$el, style);
  }

  public getAppliedStyles(styles: ToolbarStylesKeys[] = []): ToolbarStyles {
    return styles.reduce(
      (style: ToolbarStyles, key: ToolbarStylesKeys): ToolbarStyles => ({
        ...style,
        [key]: this._$el?.style[key],
      }),
      {},
    );
  }

  public focus(): void {
    this._$el?.focus();
  }

  public get name(): string {
    const { row, columnLetter } = this;
    const cellRowIndex = getCellRowIndex(row);

    return `${columnLetter}${cellRowIndex}`;
  }

  public get width(): number {
    return this._width;
  }

  public set changeWidth(width: number) {
    this._width = width;
    addCSS(this._$el, {
      width: toPixels(width),
    });
  }

  public get position(): TableCellPosition {
    const { row, column } = this;

    return {
      row,
      column,
    };
  }

  public get concatPosition(): string {
    const { row, column } = this;

    return `${row}:${column}`;
  }

  public set insertElementRef($cell: HTMLDivElement) {
    this._$el = $cell;
  }

  public get value(): string {
    return this._value;
  }

  public get parsedValue(): string {
    return this.parse(this._value);
  }

  public set changeValue(value: string) {
    this._value = value;
  }

  public set changeTextContent(value: string) {
    setTextContent(this._$el, value);
  }

  public set setValueFromFormula(formulaValue: string) {
    this.changeTextContent = this.parse(formulaValue);
    this.changeValue = formulaValue;
  }
}
