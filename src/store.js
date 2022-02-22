import { configureStore, createSlice } from "@reduxjs/toolkit";

const clubPages = createSlice({
    name: "clubPages",
    initialState: [],
    reducers: {
        addClubPage: (state, action) => {
            state.push({clubName: action.payload, id: Date.now()}); 
        },
        updateClubPage: (state, action) => state.map(clubPage => {
            if(clubPage.id === action.payload.id){
                clubPage.clubName = action.payload.clubName;
            }
            return clubPage;
        }),
        deleteClubPage: (state, action) => state.filter(clubPage => clubPage.id !== action.payload),
    }
});

export const {addClubPage, updateClubPage ,deleteClubPage} = clubPages.actions;

export default configureStore({reducer:clubPages.reducer});
