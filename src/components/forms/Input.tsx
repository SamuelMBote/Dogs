import React from 'react';
import style from './Input.module.css';
const Input: ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<typeof value>>;
  onChange:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined;
  onBlur:
    | React.DOMAttributes<HTMLInputElement>
    | React.FocusEventHandler<HTMLInputElement>
    | undefined;

  error: string | null;
}) => JSX.Element = ({label, type, name, value, onChange, onBlur, error}) => {
  return (
    <div className={style.wrapper}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <input
        className={style.input}
        type={type}
        name={name}
        value={value}
        onChange={(event: React.FocusEvent<HTMLInputElement>): void => {
          if (onChange && onChange instanceof Function) {
            onChange(event);
          }
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>): void => {
          if (onBlur && onBlur instanceof Function) {
            onBlur(event);
          }
        }}
        autoComplete={type === 'password' ? 'on' : 'off'}
      />
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default Input;
