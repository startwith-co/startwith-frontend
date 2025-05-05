import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { ReactNode } from 'react';

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  subTitleDescription?: string;
  title: string;
  contentProps?: string;
  titleProps?: string;
}

/**
 *
 * @param open
 * @param setOpen
 * @param children
 * @param title
 * @param contentProps
 * @param titleProps
 * @param subTitleDescription
 * @returns
 */
export default function CustomModal({
  open,
  setOpen,
  children,
  title,
  subTitleDescription,
  contentProps,
  titleProps,
}: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={contentProps}>
        <DialogHeader>
          <DialogTitle className={titleProps}>{title}</DialogTitle>
          {subTitleDescription && (
            <p className="text-center text-sm font-light text-[#7A7A7A]">
              {subTitleDescription}
            </p>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
