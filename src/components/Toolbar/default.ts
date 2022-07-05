import { ToolbarStyles } from '../../redux/reducers/excel/interface';
import { ToolbarStyleAction } from './interface';

export const toolbarStyleActions = (state: ToolbarStyles): ToolbarStyleAction[] => [
  {
    icon: 'format_align_left',
    name: 'Text align: Left',
    active: state['textAlign'] === 'left',
    value: { textAlign: 'left' },
  },
  {
    icon: 'format_align_center',
    name: 'Text align: Center',
    active: state['textAlign'] === 'center',
    value: { textAlign: 'center' },
  },
  {
    icon: 'format_align_right',
    name: 'Text align: Right',
    active: state['textAlign'] === 'right',
    value: { textAlign: 'right' },
  },
  {
    icon: 'format_bold',
    name: 'Font weight: Bold',
    active: state['fontWeight'] === 'bold',
    value: {
      fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold',
    },
  },
  {
    icon: 'format_italic',
    name: 'Font weight: Italic',
    active: state['fontStyle'] === 'italic',
    value: {
      fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
    },
  },
  {
    icon: 'format_underline',
    name: 'Text decoration: Underline',
    active: state['textDecoration'] === 'underline',
    value: {
      textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline',
    },
  },
];
