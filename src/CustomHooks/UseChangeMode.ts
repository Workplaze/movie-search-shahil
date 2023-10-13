import { useState } from "react";

type useChangemodeHook =[boolean, () => void]
const useChangeMode = (): useChangemodeHook => {
  const [mode, setMode] = useState<boolean>(true);

  const toggleHandler = (): void => {
    setMode(!mode);
  };

  return [mode, toggleHandler];
};

export default useChangeMode;
