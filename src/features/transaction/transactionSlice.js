import { createAsyncThunk } from "@reduxjs/toolkit"
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