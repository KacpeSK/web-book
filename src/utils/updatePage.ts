import { supabase } from "../supabaseClient";
import { Page } from "../utils/types";

const updatePage = async (page: Partial<Page> & Pick<Page, "id">) => {
  console.log("sync");
  await supabase.from("page").update(page).eq("id", page.id);
};

const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const debouncedUpdatePage = debounce(updatePage, 500);
