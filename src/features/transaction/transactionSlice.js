import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI"

const initialState = {
    isLoading: false,
    isError: false,
    error: '',
    transactions: []
}

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions()
    return transactions
})

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transaction = await editTransaction(id, data)
    return transaction
})
export const createTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
    const transaction = await addTransaction(data)
    return transaction
})
export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transaction = await deleteTransaction(id)
    return transaction
})

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions = action.payload
                state.error = ''
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.transactions = []
                state.error = action.error.message
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions.push(action.payload)
                state.error = ''
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.transactions = []
                state.error = action.error.message
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                const transactionIndex = state.transactions.findIndex(t => t.id === action.payload.id)

                state.isLoading = false
                state.isError = false
                state.transactions[transactionIndex] = action.payload
                state.error = ''
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(t => t.id !== action.payload)

                state.isLoading = false
                state.isError = false

                state.error = ''
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })


    }
})

export default transactionSlice.reducer