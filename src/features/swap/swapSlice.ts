import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchExchangeRates } from 'src/features/swap/fetchExchangeRates'
import { SwapFormValues, ToCeloRates } from 'src/features/swap/types'

export interface SwapState {
  formValues: SwapFormValues | null
  toCeloRates: ToCeloRates
  showSlippage: boolean
}

const initialState: SwapState = {
  formValues: null,
  toCeloRates: {},
  showSlippage: false,
}

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setFormValues: (state, action: PayloadAction<SwapFormValues | null>) => {
      state.formValues = action.payload
    },
    setShowSlippage: (state, action: PayloadAction<boolean>) => {
      state.showSlippage = action.payload
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      const rates = action.payload
      if (!rates) return
      state.toCeloRates = rates
    })
  },
})

export const { setFormValues, setShowSlippage, reset } = swapSlice.actions
export const swapReducer = swapSlice.reducer
