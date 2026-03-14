import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./components/Auth/AuthReducer";
import CalendarReducer from "./components/CalendarReducer";
export default configureStore({
    reducer: {
        auth: AuthReducer,
        calendars: CalendarReducer
    }
})