import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '@/store/slice/newsSlice'
import { useDispatch } from 'react-redux'

// ...

interface IStroeOption {
  reducer: {}
  preloadedState?: {}
}
let commonOptions: IStroeOption = {
  reducer: {
    news: newsReducer,
  },
}
if (typeof window !== 'undefined') {
  // 將從 Server side 取得到的 store 資料注入到 client side store 內
  commonOptions.preloadedState = window?.__PRELOADED_STATE__
  //  Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__
}
export const store = configureStore({...commonOptions})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
