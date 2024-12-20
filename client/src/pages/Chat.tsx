import { RootState } from "@/app/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { chatType, promptType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaMeteor } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'



export default function Chat({ }) {
    let { projectId, chatId } = useParams();


    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [chat, setChat] = useState<chatType>()
    const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const allProjectChats = useSelector((state: RootState) => state.projectChats.allProjectChats)

    const scrollToBottom = () => {
        setTimeout(() => {
            chatRef.current.scrollIntoView({ behavior: "smooth" });
        }, 0)
    };

    useEffect(() => {
        if (!projectId) {
            setChat(allChats.filter((chat) => chat._id == chatId)[0])
        } else {
            setChat(allProjectChats.filter((chat) => chat._id == chatId)[0])
        }
        scrollToBottom()
    })


    return (
        <div className="w-full text-foreground flex flex-col gap-5 overflow-y-scroll" >

            {
                chat?.allPrompts &&
                chat?.allPrompts?.map((prompt: promptType) => {
                    return (
                        prompt &&
                        <>
                            <div className="self-end flex gap-5 mt-6">
                                <div className="p-4 h-fit px-4 bg-primary max-w-[35vw] text-foreground rounded-2xl text-sm">
                                    {prompt.question}
                                </div>
                                <Avatar className="">
                                    <AvatarImage src={prompt.madeBy?.image} />
                                </Avatar>
                            </div>

                            <div className="flex gap-5">
                                <Avatar className="bg-accent flex items-center justify-center">
                                    <FaMeteor
                                        className="text-popover-foreground"
                                    />
                                </Avatar>
                                <div className="max-w-[65vw] text-foreground rounded-2xl text-sm">
                                    <Markdown className='prompt-mkdn'>
                                        {prompt.reply}
                                    </Markdown>
                                </div>
                            </div>


                        </>
                    )
                })
            }

            <div className="w-full  h-[20px] invisible " ref={chatRef} />
        </div>
    )
}