import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux/interface';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
