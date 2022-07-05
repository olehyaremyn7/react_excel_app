import { Nullable } from '../../interfaces';

export const compareFormulaTextContentWithValue = ($node: Nullable<HTMLDivElement>, formulaValue: string): boolean => {
  if ($node) {
    return $node.textContent === formulaValue;
  }

  return false;
};
