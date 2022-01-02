import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
export const fetchNewsAPI = createAsyncThunk('news/fetchNewsAPI', async (_: void,thunkId) => {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=tw&category=business&apiKey=41a1d4035b60422a931ed0f23b95e320')
  const data = await response.json()
  return data.articles
})
interface Item {
  title: string
  description: string
}
export interface NewsState {
  newsData: Item[]
}
const initState: NewsState = {
  newsData: [],
}

const newsSlice = createSlice({
  name: 'news',
  initialState: initState,
  reducers: {
    fetchNewsData: (state, action: PayloadAction<NewsState>) => {
      state.newsData = action.payload.newsData
    },
  },
  extraReducers:{
    [fetchNewsAPI.fulfilled.toString()]:(state, { payload }) => {
          state.newsData = payload
    }
  }
  
  // (builder) => {
  //   builder.addCase(fetchNewsAPI.fulfilled, (state, { payload }) => {
  //     state.newsData = payload.newsData
  //   })
  // },
})
// 每個定義的 reducers 會被建立成各個 action creators
export const {fetchNewsData}  = newsSlice.actions

export default newsSlice.reducer
