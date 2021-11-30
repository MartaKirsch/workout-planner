import { toast } from "react-toastify";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";

export const handleErrorWithToast = (e: Error, id: string) => {
  if (isAxiosError(e)) {
    toast.error(e.response?.data.message, {
      toastId: id,
    });
    return;
  }

  toast.error(e.message, {
    toastId: id,
  });
};
