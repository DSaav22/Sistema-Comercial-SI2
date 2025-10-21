import { createSlice } from '@reduxjs/toolkit';






export const categorySlice = createSlice({

    name: 'category',
    
    initialState: {
        isLoadingCategory: true,
        categories: [

        ],
        activeCategory: null,
    },

    reducers: {

        onSetActiveCategory: (state, { payload } ) => {
            state.activeCategory = payload;
        },

        onLoadCategories: ( state, { payload = [] }) => {
            state.isLoadingCategory = false;
            payload.forEach( category => {
                const exists = state.categories.some( dbCategory => dbCategory.id === category.id );
                if ( !exists ) {
                    state.categories.push( category );
                }
            } )
        },
      
        onAddNewCategory: (state, { payload } ) => {
            state.categories.push( payload );
            state.activeCategory = null;
        },

        onUpdateCategory: ( state, { payload }) => {
            state.categories = state.categories.map( category => {
                
                if ( category.id === payload.id ){
                    return payload;
                } 

                return category;
            } );
        },

        onDeleteCategory: ( state ) => {
            if ( state.activeCategory ) {
                state.categories = state.categories.filter( category => category.id !== state.activeCategory.id  );
                state.activeCategory = null;
            }
        },

    }

});

// Action creators are generated for each case reducer function
export const { 

    onSetActiveCategory,
    onLoadCategories,
    onAddNewCategory,
    onUpdateCategory,
    onDeleteCategory,
     
} = categorySlice.actions;