import React from 'react';
import style from './Input.module.css';
const Input = ({
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
  setValue: Function;
  onChange: Function;
  onBlur: Function;
  error: string | null;
}) => {
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
        onChange={(event: React.FocusEvent<HTMLInputElement>) => {
          if (onChange && onChange instanceof Function) {
            onChange(event);
          }
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          if (onBlur && onBlur instanceof Function) onBlur();
        }}
        autoComplete={type === 'password' ? 'on' : 'off'}
      />
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default Input;
