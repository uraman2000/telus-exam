import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useDeleteSubscriberMutation, useGetSubscriberQuery } from "../../api"
import { User } from "../../api/subscriber/types"
import { openModal } from "../../slices/modalSlice"

export default function List() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()
  const {
    data: users,

    isLoading,
    refetch,
  } = useGetSubscriberQuery(searchValue)
  const [deleteSubscriber, deleteSubscriberResult] =
    useDeleteSubscriberMutation()

  const handleSearchClick = () => {
    setSearchValue(phoneNumber)
  }

  useEffect(() => {
    if (searchValue !== "" || deleteSubscriberResult.isSuccess) {
      refetch()
    }
  }, [searchValue, refetch, deleteSubscriberResult.isSuccess])

  if (isLoading) {
    return <div>Loading...</div>
  }
  const handleOpenModal = (item: User) => {
    dispatch(openModal(item))
  }
  return (
    <div className="bg-white p-4 shadow-md rounded-lg ">
      <div className="flex w-full">
        <input
          name="search"
          type="text"
          placeholder="Phone Number"
          className="w-full py-2 px-4 border rounded-l-md focus:outline-none focus:border-blue-500"
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600"
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <h2 className="text-2xl font-semibold my-4">Data List</h2>

      <ul className="flex flex-wrap justify-center ">
        {users!.map((item, index) => (
          <li key={index} className=" p-2  w-full md:w-1/2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold mb-2">
                Phone Number: {item.phoneNumber}
              </p>
              <p className="text-gray-600">Username: {item.username}</p>
              <p className="text-gray-600">Password: {item.password}</p>
              <p className="text-gray-600">Domain: {item.domain}</p>
              <p className="text-gray-600">Status: {item.status}</p>
              <p className="text-gray-600">Call Forward No Reply:</p>
              <p className="text-gray-600">
                Provisioned:{" "}
                {item.features.callForwardNoReply.provisioned ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                Destination:{" "}
                <a href={item.features.callForwardNoReply.destination}>
                  {item.features.callForwardNoReply.destination}
                </a>
              </p>
              <div className=" flex justify-end mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleOpenModal(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteSubscriber(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
