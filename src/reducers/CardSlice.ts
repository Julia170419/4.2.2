import type { VegetableCard, PopupState } from "../types/VegetableCard";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCards } from './CardsThunks'

interface CardState {
    cardList: VegetableCard[];
    popup: PopupState,
    isLoading: boolean,
    error: string | null,
    basket: VegetableCard[]
}

const initialState: CardState = {
    cardList: [], 
    popup: { type: 'closed' },
    isLoading: false,
    error: null,
    basket: []
}

export const cardSlice = createSlice({
    name: 'cardList',
    initialState,
    reducers: {
        incrementCount (state, action) {
            const existing = state.basket.find(item => item.id === action.payload.id);
            if (existing) {
                existing.count += 1;
            } else {
                state.basket.push({...action.payload, count: 1})
            }
        },
        decrementCount (state, action) {
            const item = state.basket.find(item => item.id === action.payload.id);
            if (item && item.count > 0) item.count -= 1;
            if (item && item.count === 0) {
                state.basket = state.basket.filter(item => item.id !== action.payload.id);
            }
        },
        togglePopup (state) {
            state.popup = { type: state.popup.type === 'opened' ? 'closed' : 'opened' }
        },
        addToCart (state, action) {
            const existing = state.basket.find(item => item.id === action.payload.id);
            const addCount = action.payload.count ? action.payload.count : 1
            if (existing) {
                existing.count += 1
            } else {
                state.basket.push({...action.payload, count: addCount})
            }
        }
   },
   extraReducers: builder => { 
    builder
        .addCase(fetchCards.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
            state.isLoading = false,
            state.error = null,
            state.cardList = action.payload
        })
        .addCase(fetchCards.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload as string
        })
    }
})

export const {incrementCount, decrementCount, addToCart, togglePopup} = cardSlice.actions;

export default cardSlice.reducer;