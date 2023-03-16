import React from 'react';
import style from './Button.module.css';
const Button: ({
  children,
  disabled,
  ...props
}: {
  children: string;
  disabled?: boolean | undefined;
}) => JSX.Element = ({children, disabled, ...props}) => {
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
