import { useState, useEffect } from "react"

export enum typeEnum {
  Error = "Error",
  Success = "Success",
}
interface IProp {
  message: string
  type?: typeEnum
}
const Notification = ({ message, type }: IProp) => {
  const [isVisible, setIsVisible] = useState(true)
  const [typeState, setTypeState] = useState<string>("bg-green-500")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000) // Hide the notification after 5 seconds (adjust as needed)

    if (type == typeEnum.Error) {
      setTypeState("bg-red-500")
    }

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className={`fixed  bottom-4 transform transition-transform ${
        isVisible ? "translate-x-0 left-4" : "-translate-x-full left-0"
      } duration-300 w-64 ${typeState} text-white p-4 rounded-md`}
    >
      {message}
    </div>
  )
}

export default Notification
