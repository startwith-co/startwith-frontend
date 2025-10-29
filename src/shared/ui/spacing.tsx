import React from 'react';
import clsx from 'clsx';

type Direction = 'vertical' | 'horizontal';

interface SpacingProps {
  size: number;
  direction?: Direction;
  inline?: boolean;
  'aria-hidden'?: boolean;
}

export default function Spacing({
  size,
  direction = 'vertical',
  inline = false,
  ...rest
}: SpacingProps) {
  const style =
    direction === 'vertical'
      ? { height: `${size}px`, minHeight: `${size}px` }
      : { width: `${size}px`, minWidth: `${size}px` };

  return (
    <div
      {...rest}
      aria-hidden={rest['aria-hidden'] ?? true}
      className={clsx(inline ? 'inline-block' : 'block')}
      style={style}
    />
  );
}
