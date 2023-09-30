import { useDispatch } from "react-redux"
import Modal from "./components/Modal"
import List from "./components/subscriber/List"
import { openModal } from "./slices/modalSlice"
import AddIcon from "./assets/AddIcon"
const initialState = {
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
}

export default function App() {
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(openModal(initialState))
  }
  return (
    <div className="container mx-auto p-4 mt-10">
      <List />
      <Modal />
      <div className="fixed right-10 bottom-10 md:right-20  md:bottom-20">
        <button onClick={handleOpenModal}>
          <AddIcon />
        </button>
      </div>
    </div>
  )
}
