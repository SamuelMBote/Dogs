import React from 'react';
import style from './Input.module.css';
const Input = ({
  label,
  type,
  name,
}: {
  label: string;
  type: string;
  name: string;
}) => {
  return (
    <div className={style.wrapper}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <input className={style.input} type={type} name={name} />
      <p className={style.error}>Error</p>
    </div>
  );
};

export default Input;
