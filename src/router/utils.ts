import { createSearchParams, URLSearchParamsInit } from 'react-router-dom';
import { Routes } from 'src/router/interface';

export const createExcelLink = (id: string): string => `${Routes.EXCEL}/${id}`;

export const createQueryParams = (params: URLSearchParamsInit): string => createSearchParams(params).toString();
