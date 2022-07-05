import { RootState } from '../../interface';
import { DashboardState } from './interface';

export const dashboardSelector = ({ dashboard }: RootState): DashboardState => dashboard;
