import { useState, useCallback } from 'react';

interface useCheckboxReturn<ItemType> {
  isChecked: (item: ItemType) => boolean;
  onChange: (item: ItemType) => void;
  data: ItemType;
}

export const useCheckbox = <ItemType>(defaultItem: ItemType): useCheckboxReturn<ItemType> => {
  const [selectedItem, setSelectedItem] = useState<ItemType>(defaultItem);

  const isChecked = useCallback((item: ItemType) => item === selectedItem, [selectedItem]);

  const onChange = useCallback((item: ItemType) => setSelectedItem(item), [setSelectedItem]);

  return {
    isChecked,
    onChange,
    data: selectedItem,
  };
};
