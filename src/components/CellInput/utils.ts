export const isCellsRange = (cellName: string): boolean => cellName.includes(':');

export const validateCellNameAndCellRange = (searchQuery: string, isGroup: boolean): boolean =>
  !!searchQuery.match(isGroup ? /^([a-zA-Z])(\d{0,4}):([a-zA-Z])(\d{0,4}$)/ : /^([a-zA-Z])(\d{0,7}$)/);

export const getCellColumnLetterAndRow = (str: string): [string, number] => [
  str.slice(0, 1),
  +str.replace(/^\D+/g, ''),
];

export const getCellNamesFromCellsRange = (searchQuery: string): [string, string] =>
  searchQuery.split(':') as [string, string];

export const isNewCellNameEqualPrev = (prevCellName: string, currentCellName: string): boolean =>
  prevCellName.trim().toLowerCase() === currentCellName.trim().toLowerCase();
