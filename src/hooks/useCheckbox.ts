import { useState, useCallback } from 'react';

interface useCheckboxReturn<T> {
  isChecked: (item: T) => boolean;
  onChange: (item: T) => void;
  data: T;
}

export const useCheckbox = <T>(defaultItem: T): useCheckboxReturn<T> => {
  const [selectedItem, setSelectedItem] = useState<T>(defaultItem);

  const isChecked = useCallback((item: T) => item === selectedItem, [selectedItem]);

  const onChange = useCallback((item: T) => setSelectedItem(item), [setSelectedItem]);

  return {
    isChecked,
    onChange,
    data: selectedItem,
  };
};
