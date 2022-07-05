import { TableSelection } from '../../excel/Table/TableSelection';
import { ToolbarStyles } from '../../redux/reducers/excel/interface';

export interface ToolbarProps {
  selection: TableSelection;
}

export interface ToolbarStyleAction {
  icon: string;
  name: string;
  active: boolean;
  value: ToolbarStyles;
}
