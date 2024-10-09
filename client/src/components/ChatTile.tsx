import { chatType } from "@/types"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { deleteChat, renameChat } from "@/features/chatsSlice"
import { RootState } from "@/app/store"

const ChatTile = ({ name, chatId, userId }: { name: string, chatId: string, userId: string | undefined }) => {
    const [chatName, setChatName] = useState(name)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    const allChats = useSelector((state: RootState) => state.chats.allChats)



    const handleDelete = () => {
        dispatch(deleteChat(chatId))
        navigate(`/${userId}`)
    }


    const handleSubmit = (e: any) => {
        if (e.keyCode == 13) {
            let newName = e.target.value.trim() == "" ? "Untitled" : e.target.value
            setChatName(newName)
            setEditMode(false)

            let chatIdx = allChats.findIndex(chat => chat._id == chatId)
            dispatch(renameChat({ idx: chatIdx, newName: newName }))
        }
    }

    return (
        <NavLink
            to={`/${userId}/${chatId}`}
            className={({ isActive }) => isActive ? "flex justify-between items-center p-3 rounded-lg bg-accent" : "flex justify-between items-center p-3 rounded-lg"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!editMode ?
                <h3 onDoubleClick={() => setEditMode(true)}> {chatName} </h3> :
                <Input type="text" className="text-xs p-0 py-0 h-fit" onKeyDown={(e) => handleSubmit(e)} />
            }

            <button
                className={`text-lg ${!hover ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleDelete}
            >
                <MdDelete />
            </button>
        </NavLink>
    )
}

export default ChatTile