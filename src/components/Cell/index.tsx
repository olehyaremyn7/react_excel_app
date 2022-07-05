import './styles.scss';

import React, { ChangeEvent, FC, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { NavigationKeys } from 'src/excel/interfaces';

import { JSX } from '../../interfaces';
import ContentEditable from '../UI/ContentEditable';
import { CellProps } from './interface';
import { createCellAttributes, createCellPartStyles } from './utils';

const Cell: FC<CellProps> = ({
  cell,
  selectCell,
  selectCellsGroup,
  navigateToNextSelectedCell,
  changeFormulaValueAndUpdateCell,
}): JSX => {
  const cellRef = useRef<HTMLDivElement>(null);
  const { column, row, TABLE_PART } = cell;
  const attributes = createCellAttributes(TABLE_PART, column, row);
  const styles = createCellPartStyles(cell.width, cell.styles);

  useEffect((): void => {
    if (cellRef.current) {
      cell.insertElementRef = cellRef.current;
      cell.changeTextContent = cell.parsedValue;
    }
  }, []);

  const onMouseDownHandler = ({ shiftKey }: MouseEvent<HTMLDivElement>): void => {
    if (shiftKey) {
      selectCellsGroup(cell);
    } else {
      selectCell(cell);
    }
  };

  const onKeyDownHandler = async (event: KeyboardEvent<HTMLDivElement>): Promise<void> => {
    const { shiftKey, key } = event;
    const pressedKey = key as NavigationKeys;
    const keys = Object.values(NavigationKeys);

    if (keys.includes(pressedKey) && !shiftKey) {
      event.preventDefault();
      await navigateToNextSelectedCell(pressedKey);
    }
  };

  const onInputHandler = ({ currentTarget: { textContent: text } }: ChangeEvent<HTMLDivElement>): void => {
    changeFormulaValueAndUpdateCell(text as string);
  };

  return (
    <ContentEditable
      {...attributes}
      reference={cellRef}
      className="cell"
      styles={styles}
      onInput={onInputHandler}
      onKeyDown={onKeyDownHandler}
      onMouseDown={onMouseDownHandler}
    />
  );
};

export default Cell;
