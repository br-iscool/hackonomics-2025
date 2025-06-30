import { proxy } from "valtio";

export const uistate = proxy({
  showJobSearch: false,
  showLoanDialog: false,
  jobResult: null as string | null,
});
