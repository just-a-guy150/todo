import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    events: [],
    modalState: false
}

const CalendarReducer = createSlice({
    name: "calendars",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload]
        },
        openModal: (state) => {
            state.modalState = true
        },
        closeModal: (state) => {
            state.modalState = false
        }
    }
});

export const { addEvent, openModal, closeModal } = CalendarReducer.actions

export default CalendarReducer.reducer