export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DropdownProps {
  buttonText: string;
  items: DropdownItem[];
  buttonClassName?: string;
  menuClassName?: string;
  divClassName?: string;
  isHeader?: boolean;
  isLoginHeaderOption?: boolean;
}
