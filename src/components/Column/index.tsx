import './styles.scss';

import React, { FC } from 'react';

import { JSX } from '../../interfaces';
import { ColumnProps } from './interface';
import { createColumnAttributes, createColumnPartStyles } from './utils';

const Column: FC<ColumnProps> = ({ column, onMouseDownResize }): JSX => {
  const { TABLE_PART, columnId, columnLetter } = column;
  const attributes = createColumnAttributes(TABLE_PART, columnId);
  const styles = createColumnPartStyles(column.width);

  return (
    <div {...attributes} className="column" style={styles}>
      {columnLetter}
      <div className="col-resize" onMouseDown={onMouseDownResize} data-table-resize-part={TABLE_PART} />
    </div>
  );
};

export default Column;
