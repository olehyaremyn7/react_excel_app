import { Nullable } from '../../../interfaces';
import { TableState } from '../excel/interface';

export interface DashboardState {
  records: TableRecord[];
  isLoading: boolean;
  error: Nullable<string>;
}

export interface TableRecord extends Pick<TableState, 'id' | 'title' | 'createdDate' | 'openedDate'> {}
