import './styles.scss';

import React, { CSSProperties, FC, memo, MouseEvent, ReactElement, useEffect, useRef } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import {
  changeContent,
  changeStyles,
  setError,
  tableResize,
  updateFormula,
  updateOpenedDate,
} from 'src/redux/reducers/excel/actionCreators';
import { ResizeState, TableParts } from 'src/redux/reducers/excel/interface';
import { addCSS, toDatasetKey, toPixels } from 'src/utils';
import For from 'src/utils/jsx/For';
import If from 'src/utils/jsx/If';

import { NavigationKeys, TableCell, TableColumn, TableRow } from '../../excel/interfaces';
import {
  createCellName,
  isInGroupOneCell,
  isResizeTypeColumn,
  isTableColumn,
  shouldUpdateCellInFormula,
} from '../../excel/utils';
import { JSX, Nullable } from '../../interfaces';
import Cell from '../Cell';
import Column from '../Column';
import { TablePartsDataAttributes, TableProps, TableResizeType } from './interface';
import {
  createRowPartAttributes,
  createRowPartStyles,
  getFromDataset,
  hideResizerStyles,
  showResizerStyles,
} from './utils';

const Table: FC<TableProps> = ({ table, selection }): JSX => {
  const tableRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (tableRef.current) {
      selection.insertElementRef = tableRef.current;
      selectCell(selection.getStartSelectedCell());
    }

    dispatch(updateOpenedDate());
  }, []);

  const selectCell = (selectedCell: TableCell): void => {
    if (selection.isCellSelected(selectedCell)) {
      return;
    }

    selection.selectCell(selectedCell);
    updateToolbarStylesInStore();
    updateFormulaInStore();
  };

  const selectCellsGroup = (selectedCell: TableCell): void => {
    if (selection.isCellInGroup(selectedCell)) {
      return;
    }

    selection.selectCellsGroup(selectedCell);
    updateFormulaInStore(shouldUpdateCellInFormula(isInGroupOneCell(selection.selectedCellsCount), selectedCell));
  };

  const navigateToNextSelectedCell = async (pressedKey: NavigationKeys): Promise<void> => {
    const nextCell = await selection.navigateToNextSelectedCell(pressedKey);

    if (nextCell) {
      updateToolbarStylesInStore();
      updateFormulaInStore();
    }
  };

  const updateToolbarStylesInStore = (): void => {
    dispatch(changeStyles(selection.currentCellAppliedStyles));
  };

  const updateFormulaInStore = (selectedCell: Nullable<TableCell> = null): void => {
    const cellName = createCellName(selection.currentCell, selectedCell, !!selectedCell);
    const formulaValue = selection.currentCellValue;

    dispatch(updateFormula({ cellName, formulaValue }));
  };

  const resizeTable = ($resizer: HTMLDivElement): Promise<ResizeState> =>
    new Promise((resolve): void => {
      const $parent: Nullable<HTMLDivElement> = $resizer.closest(
        `[${TablePartsDataAttributes.TABLE_RESIZE_TYPE}=${TableResizeType.RESIZABLE}]`,
      );

      if (!$parent) {
        return;
      }

      const { right: rightCoords, width, bottom: bottomCoords, height } = $parent.getBoundingClientRect();
      const resizerType = getFromDataset(
        $resizer,
        toDatasetKey(TablePartsDataAttributes.TABLE_RESIZE_PART),
      ) as TableParts;
      const isColumn = isResizeTypeColumn(resizerType);
      const sideProp: keyof Pick<CSSProperties, 'bottom' | 'right'> = isColumn ? 'bottom' : 'right';
      let resizeValue: number = 0;

      addCSS($resizer, showResizerStyles(sideProp));

      document.onmousemove = ({ pageX, pageY }): void => {
        const resizerSideProp: typeof sideProp = isColumn ? 'right' : 'bottom';
        const delta = isColumn ? pageX - rightCoords : pageY - bottomCoords;

        resizeValue = (isColumn ? width : height) + delta;

        addCSS($resizer, {
          [resizerSideProp]: toPixels(-delta),
        });
      };

      document.onmouseup = (): void => {
        document.onmousemove = null;
        document.onmouseup = null;

        const parentSizeProp: keyof Pick<CSSProperties, 'width' | 'height'> = isColumn ? 'width' : 'height';
        const id = +getFromDataset(
          $parent,
          toDatasetKey(
            isColumn ? TablePartsDataAttributes.COLUMN_PART_POSITION : TablePartsDataAttributes.ROW_PART_POSITION,
          ),
        );

        addCSS($parent, {
          [parentSizeProp]: toPixels(resizeValue),
        });

        if (isColumn) {
          table.updateColumnWidth(id, resizeValue);
        }

        resolve({
          value: resizeValue,
          type: resizerType,
          id,
        });

        addCSS($resizer, hideResizerStyles());
      };
    });

  const onMouseDownResizeHandler = async ({ target }: MouseEvent<HTMLDivElement>): Promise<void> => {
    try {
      const resizeState = await resizeTable(target as HTMLDivElement);

      dispatch(tableResize(resizeState));
    } catch ({ message }) {
      dispatch(setError(message as string));
    }
  };

  const changeFormulaValueAndUpdateCell = (value: string): void => {
    if (selection.currentCell) {
      const id = selection.currentCell.concatPosition;

      selection.updateCurrentCellValue(value, false);
      dispatch(
        changeContent({
          value,
          id,
        }),
      );
    }
  };

  const createTableCells = (row: TableRow): JSX => (
    <For each={row}>
      {(cell: TableCell): ReactElement => {
        const { id } = cell;

        return (
          <Cell
            key={id}
            cell={cell}
            selectCell={selectCell}
            selectCellsGroup={selectCellsGroup}
            navigateToNextSelectedCell={navigateToNextSelectedCell}
            changeFormulaValueAndUpdateCell={changeFormulaValueAndUpdateCell}
          />
        );
      }}
    </For>
  );

  const createTableColumn = (): JSX => (
    <For each={table.column}>
      {(column: TableColumn): ReactElement => {
        const { id } = column;

        return <Column key={id} column={column} onMouseDownResize={onMouseDownResizeHandler} />;
      }}
    </For>
  );

  const createTableRows = (): JSX => (
    <For each={[[], ...table.cells]}>
      {(row: TableRow, rowIndex: number): ReactElement => {
        const {
          state: { rows },
        } = table;
        const isColumn = isTableColumn(rowIndex);
        const attributes = createRowPartAttributes(isColumn, rowIndex);
        const styles = createRowPartStyles(rows, rowIndex, isColumn);
        const infoValue = isColumn ? '' : rowIndex;

        return (
          <div {...attributes} className="row" style={styles}>
            <div className="row-info">
              {infoValue}
              <If isTrue={!isColumn}>
                <div
                  className="row-resize"
                  onMouseDown={onMouseDownResizeHandler}
                  data-table-resize-part={TableParts.ROW}
                />
              </If>
            </div>
            <div className="row-data">{isColumn ? createTableColumn() : createTableCells(row)}</div>
          </div>
        );
      }}
    </For>
  );

  return (
    <section id="table" ref={tableRef} className="table">
      {createTableRows()}
    </section>
  );
};

export default memo(Table, (): boolean => true);
