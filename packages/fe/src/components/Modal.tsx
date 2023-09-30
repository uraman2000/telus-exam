import React, { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useGetSubscriberQuery,
  usePatchSubscriberMutation,
  usePostSubscriberMutation,
} from "../api"
import CloseIcon from "../assets/CloseIcon"
import { closeModal } from "../slices/modalSlice"
import { RootState } from "../store"

function ModalContent() {
  const { content } = useSelector((state: RootState) => state.modal)
  const [postSubscriber, postSubscriberResult] = usePostSubscriberMutation()
  const [patchSubscriber, patchSubscriberResult] = usePatchSubscriberMutation()

  const { refetch } = useGetSubscriberQuery("")

  const dispatch = useDispatch()

  const [formData, setFormData] = useState(content)

  useEffect(() => {
    setFormData(content)
  }, [content])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (name === "status") {
      // Update the status field
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }))
    } else if (type === "select-one") {
      const updatedData = {
        ...formData,
        features: {
          callForwardNoReply: {
            ...formData.features.callForwardNoReply,
            [name.split(".")[2]]: value,
          },
        },
      }
      setFormData(updatedData)
    } else {
      // Check if the name contains dot notation (nested property)
      if (name.includes(".")) {
        const keys = name.split(".")
        const updatedData = {
          ...formData,
          features: {
            callForwardNoReply: {
              ...formData.features.callForwardNoReply,
              [keys[2]]: value,
            },
          },
        }
        setFormData(updatedData)
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }))
      }
    }
  }

  useEffect(() => {
    if (postSubscriberResult.isSuccess || patchSubscriberResult.isSuccess) {
      dispatch(closeModal())
      refetch()
    }
  }, [dispatch, postSubscriberResult, refetch, patchSubscriberResult])

  const handleSubmit = () => {
    if (content.phoneNumber) {
      patchSubscriber(formData)
    } else {
      postSubscriber(formData)
    }
  }

  return (
    <div className="container mx-auto py-4 ">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4 ">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            required
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="domain"
          >
            Domain
          </label>
          <input
            required
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Domain"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            required
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <label
          className="block text-gray-600 font-bold mb-2"
          htmlFor="callForwardNoReply"
        >
          Call Forward No Reply
        </label>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="provisioned"
          >
            Provisioned
          </label>

          <select
            required
            id="provisioned"
            name="features.callForwardNoReply.provisioned"
            value={formData.features.callForwardNoReply.provisioned.toString()}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="destination"
          >
            Destination
          </label>
          <input
            required
            type="text"
            id="destination"
            name="features.callForwardNoReply.destination"
            value={formData.features.callForwardNoReply.destination}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Destination"
          />
        </div>
        <button
          type="submit"
          className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const Modal: React.FC = () => {
  const { isOpen, content } = useSelector((state: RootState) => state.modal)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    const openModalTimeout = setTimeout(() => {
      setIsVisible(isOpen)
    }, 100)

    return () => {
      clearTimeout(openModalTimeout)
    }
  }, [isOpen])

  const overlayClasses = `fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-80 transition-opacity ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`

  const modalClasses = `bg-white p-10 transform transition-transform w-full md:w-2/3 lg:w-2/4 xl:w-1/3  ${
    isVisible ? "scale-100" : "scale-0"
  }`

  return (
    <div className={overlayClasses}>
      <div className={modalClasses}>
        {/* <button onClick={handleClose}>Close Modal</button> */}
        <button className="fixed top-7 right-7" onClick={handleClose}>
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {!content.phoneNumber ? "Add Content" : "Edit Content"}
        </h2>
        <ModalContent />
      </div>
    </div>
  )
}

export default Modal
