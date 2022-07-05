import { CSSProperties } from 'react';

import { RESIZER_POSITION_VALUE } from '../../constants';
import { getHeight, getRowIndex } from '../../excel/utils';
import { TableParts, TablePartsState } from '../../redux/reducers/excel/interface';
import { toPixels } from '../../utils';
import { RowPartAttributes, TablePartsDataAttributes, TableResizeType } from './interface';

export const getFromDataset = <T extends HTMLElement>($node: T, prop: string): string => $node.dataset[prop] || '';

export const createRowPartAttributes = (isColumn: boolean, rowIndex: number): RowPartAttributes =>
  !isColumn
    ? {
        [TablePartsDataAttributes.TABLE_PART]: TableParts.ROW,
        [TablePartsDataAttributes.ROW_PART_POSITION]: getRowIndex(rowIndex),
        [TablePartsDataAttributes.TABLE_RESIZE_TYPE]: TableResizeType.RESIZABLE,
      }
    : ({} as RowPartAttributes);

export const createRowPartStyles = (
  rowsState: TablePartsState,
  rowIndex: number,
  isColumn: boolean,
): CSSProperties => ({
  height: toPixels(getHeight(isColumn ? {} : rowsState, getRowIndex(rowIndex))),
});

export const showResizerStyles = (sideProp: keyof Pick<CSSProperties, 'bottom' | 'right'>): CSSProperties => ({
  opacity: 1,
  [sideProp]: toPixels(RESIZER_POSITION_VALUE),
});

export const hideResizerStyles = (): CSSProperties => ({
  opacity: 0,
  bottom: 0,
  right: 0,
});
