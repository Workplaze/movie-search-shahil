import { useState } from "react";

const useChangeMode = (): [boolean, () => void] => {
  const [mode, setMode] = useState<boolean>(true);

  const toggleHandler = (): void => {
    setMode(!mode);
  };

  return [mode, toggleHandler];
};

export default useChangeMode;
