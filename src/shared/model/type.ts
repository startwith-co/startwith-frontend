export interface DropdownItem {
  label: string;
}

export interface DropdownProps {
  buttonText: string;
  items: DropdownItem[];
  buttonClassName?: string;
  menuClassName?: string;
}
