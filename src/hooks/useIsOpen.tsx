import { useState } from "react"

export default function UseISOpen() {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const handleToggle = () => setIsOpen(!isOpen)

    return { setIsOpen, isOpen, handleOpen, handleClose, handleToggle }
}
