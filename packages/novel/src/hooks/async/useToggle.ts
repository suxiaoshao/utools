import { useState, useCallback } from 'react';

export interface ToggleOptions {
  initialOpen?: boolean;
}

export interface ToggleReturn {
  open: boolean;
  handleToggle: () => void;
}

export function useToggle({ initialOpen = false }: ToggleOptions): ToggleReturn {
  const [open, setOpen] = useState(initialOpen);
  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);
  return { open, handleToggle };
}
