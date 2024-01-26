/* Instruments */
import { clientSlice, counterSlice, userSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  user: userSlice.reducer,
  client: clientSlice.reducer,
};
