import React from 'react';
import style from './Button.module.css';
const Button = ({
  children,
  disabled,
  ...props
}: {
  children: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={style.button}
      disabled={disabled ? true : false}
      {...props}
    >
      {children}{' '}
    </button>
  );
};

export default Button;
