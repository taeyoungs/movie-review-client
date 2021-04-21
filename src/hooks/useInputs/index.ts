import { useCallback, useState } from 'react';

interface IRegistrationProps {
  id: string;
  pw: string;
}

const useInputs = (initialState: IRegistrationProps) => {
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
