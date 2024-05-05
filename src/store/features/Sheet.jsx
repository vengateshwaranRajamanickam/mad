import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sheetID: null,
    question:[],
};
export const Sheet = createSlice({
    name: "Sheet",
    initialState,
    reducers: {
        setQuestion:(state,{payload})=>{
            state.question=payload
        },
        setSheetID:(state,{payload})=>{
            state.sheetID=payload
        }
    },
});
export const { setQuestion, setSheetID } = Sheet.actions;

export default Sheet.reducer;