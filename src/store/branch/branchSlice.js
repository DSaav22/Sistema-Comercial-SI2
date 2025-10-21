



import { createSlice } from '@reduxjs/toolkit';

export const branchSlice = createSlice({
    name: 'branch',

    initialState: {
        isLoadingBranches: true, //ya cargo
        branches: [

        ],
        activeBranch: null,
    },

    reducers: {

        onSetActiveBranch: (state, { payload } ) => {
            state.activeBranch = payload;
        },

        onLoadBranches: ( state, { payload = [] }) => {
            state.isLoadingBranches = false;    // no cargo o está en proceso
            payload.forEach( branch => {
                const exists = state.branches.some( dbBranch => dbBranch.id === branch.id );
                if ( !exists ) {
                    state.branches.push( branch );
                }
            } )
        },
      
        onAddNewBranch: (state, { payload } ) => {
            state.branches.push( payload );
            state.activeBranch = null;
        },

        onUpdateBranch: ( state, { payload }) => {
            state.branches = state.branches.map( branch => {          
                if ( branch.id === payload.id ){
                    return payload;
                } 
                return branch;
            } );
        },

        onDeleteBranch: ( state ) => {
            if ( state.activeBranch ) {
                state.branches = state.branches.filter( branch => branch.id !== state.activeBranch.id  );
                state.activeBranch = null;
            }
        },

    }
});


// Action creators are generated for each case reducer function
export const { 

    onSetActiveBranch,
    onAddNewBranch,
    onUpdateBranch,
    onDeleteBranch, 
    onLoadBranches,

} = branchSlice.actions;