import React from 'react';
const validacao: {[key: string]: {regex: RegExp; message: string}} = {
  email: {
    regex: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    message: 'Preencha um Email válido',
  },
};
const useForm = (type?: string | false) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (type && validacao[type] && !validacao[type].regex.test(value)) {
      setError(validacao[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange(event: React.FocusEvent<HTMLInputElement>) {
    if (event && event.target instanceof HTMLInputElement) {
      if (error) validate(event.target.value);
      setValue(event.target.value);
    }
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
