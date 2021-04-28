import { useCallback, useState } from 'react';

const useInputs = (initialState: Record<string, string>) => {
  const [form, setForm] = useState(initialState);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm((form) => {
        return {
          ...form,
          [name]: value,
        };
      });
    },
    []
  );

  const reset = useCallback(() => {
    setForm(initialState);
  }, []);

  return { form, onChange, reset };
};

export default useInputs;
