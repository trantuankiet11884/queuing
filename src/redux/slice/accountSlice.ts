import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AccountType, LogEntry } from "../../interface";
import { firestore } from "../../firebase/config";

interface AccountState {
  accounts: AccountType[];
  userAccount: AccountType | null;
  log: LogEntry[];
}

const initialState: AccountState = {
  accounts: [],
  userAccount: null,
  log: [],
};

export const fetchDataAccount = createAsyncThunk("account/fetch", async () => {
  const snapshot = await firestore.collection("accounts").get();
  const account = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as AccountType)
  );
  return account;
});

export const addAccount = createAsyncThunk(
  "account/add",
  async (account: AccountType) => {
    const collection = await firestore.collection("accounts").add(account);
    account.id = collection.id;
    return account;
  }
);

export const saveLogToFirestore = createAsyncThunk(
  "log/save",
  async (logEntry: LogEntry) => {
    try {
      const collection = await firestore
        .collection("activityLogs")
        .add(logEntry);
      logEntry.id = collection.id;
      return logEntry;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setUserAccount: (state, action: PayloadAction<AccountType | null>) => {
      state.userAccount = action.payload;
    },
    addLog: (state, action: PayloadAction<LogEntry>) => {
      state.log.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDataAccount.fulfilled,
        (state, action: PayloadAction<AccountType[]>) => {
          state.accounts = action.payload;
        }
      )
      .addCase(
        addAccount.fulfilled,
        (state, action: PayloadAction<AccountType>) => {
          state.accounts.push(action.payload);
        }
      )
      .addCase(
        saveLogToFirestore.fulfilled,
        (state, action: PayloadAction<LogEntry>) => {
          state.log.push(action.payload);
        }
      );
  },
});
export const { setUserAccount, addLog } = accountSlice.actions;
export default accountSlice.reducer;
