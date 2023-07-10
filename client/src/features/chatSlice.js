import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
};

// functions
export const getConversation = createAsyncThunk(
  "chat/conversation",
  async (access_token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CONVERSATION_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// create or open chat
export const open_create_conversation = createAsyncThunk(
  "chat/open_create_conversation",
  async (values, { rejectWithValue }) => {
    const { access_token, receiver_id } = values;
    try {
      const { data } = await axios.post(
        `${CONVERSATION_ENDPOINT}`,
        {
          receiver_id,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// get all messages
export const getMessages = createAsyncThunk(
  "chat/getMessage",
  async (values, { rejectWithValue }) => {
    const { access_token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
