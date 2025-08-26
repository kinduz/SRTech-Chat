import { useState, useCallback } from "react";

interface UseToggleReturn {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useToggle(initialState: boolean = false): UseToggleReturn {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened(prev => !prev);
  }, []);

  return {
    opened,
    open,
    close,
    toggle,
  };
}
