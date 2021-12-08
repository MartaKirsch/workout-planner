export const checkIsUlElement = (
  toBeDetermined: HTMLUListElement | EventTarget
): toBeDetermined is HTMLUListElement => {
  if (
    (toBeDetermined as HTMLUListElement).scrollHeight !== undefined &&
    (toBeDetermined as HTMLUListElement).scrollHeight !== null
  ) {
    return true;
  }
  return false;
};
