export interface ButtonProps {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  iconName: string;
  color?: ButtonColorType;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  active?: boolean;
}

export type ButtonColorType = 'accent' | 'primary' | 'error' | 'success';
