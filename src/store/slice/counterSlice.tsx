import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CounterState {
	count: number
}
const initState: CounterState = {
	count: 0,
}

const counterSlice = createSlice({
	name: 'counter',
	initialState: initState,
	reducers: {
		increment: (state) => {
			// 在 Redux Toolkit  中 reducer 內部是使用 Immer 這套 library，所以要用 immutable 的方式去撰寫。
			state.count += 1
		},
		decrement: (state) => {
			state.count -= 1
		},
		incrementByAmount: (state, action:PayloadAction<number>) => {
			state.count += action.payload
		},
	},
})
// 每個定義的 reducers 會被建立成各個 action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
