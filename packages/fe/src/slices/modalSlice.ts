// src/features/modalSlice.ts

import { createSlice } from "@reduxjs/toolkit"
import { User } from "../api/subscriber/types"

interface ModalState {
  isOpen: boolean
  content: User
}

const initialState: ModalState = {
  isOpen: false,
  content: {
    _id: "",
    phoneNumber: "",
    username: "",
    password: "",
    domain: "",
    status: "ACTIVE",
    features: {
      callForwardNoReply: {
        provisioned: false,
        destination: "",
      },
    },
  },
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, payload) => {
      state.content = payload.payload
      state.isOpen = true
    },
    closeModal: state => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
