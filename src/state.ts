import { proxy } from "valtio";

export const uistate = proxy({
  showJobSearch: false,
  jobResult: null as string | null,
});
