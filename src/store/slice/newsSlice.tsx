import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// 透過 createAsyncThunk 來實作一個 非同步的 action
// 特別記得要 export ，才可方便之後 dispatch 使用
export const fetchNewsAPI = createAsyncThunk('news/fetchNewsAPI', async (_: void, thunkId) => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines?country=tw&category=business&apiKey=41a1d4035b60422a931ed0f23b95e320')
  return response.data.articles
})
// 取得英文版 Data
export const fetchEnNewsAPI = createAsyncThunk('news/fetchEnNewsAPI', async (_: void, thunkId) => {
  const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2021-12-09&sortBy=publishedAt&apiKey=41a1d4035b60422a931ed0f23b95e320')
  return response.data.articles
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
    // 清空 newsData
    cleanNewsData: (state) => {
      state.newsData = []
    },
  },
  extraReducers: {
    [fetchNewsAPI.fulfilled.toString()]: (state, { payload }) => {
      state.newsData = payload
    },
    [fetchEnNewsAPI.fulfilled.toString()]: (state, { payload }) => {
      state.newsData = payload
    },
  },
  // 另一種寫法： 使用 (builder) =>{}
  // (builder) => {
  //   builder.addCase(fetchNewsAPI.fulfilled, (state, { payload }) => {
  //     state.newsData = payload.newsData
  //   })
  // },
})
// 每個定義的 reducers 會被建立成各個 action creators
export const { cleanNewsData } = newsSlice.actions

export default newsSlice.reducer
