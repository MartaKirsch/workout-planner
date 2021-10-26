import React, { useCallback, useEffect } from "react";

export const useOutsideClickWithCallback = <Type extends Node>(
  ref: React.RefObject<Type>,
  callback: (e: MouseEvent) => void | Promise<void>
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!ref?.current?.contains(e?.target as Node)) {
        callback(e);
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref, handleClickOutside]);
};
