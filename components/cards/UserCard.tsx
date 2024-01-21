"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType}: Props) => {
    const router = useRouter();
    return (
        <article className="user-card">
            <div className="user-card_avatar ">
                <img
                    src={imgUrl}
                    alt="logo"
                    width={30}
                    height={30}
                    className="rounded-full w-10 h-10 "
                />
                <div className="flex-1 text-ellipsis">
                    <h4 className=" text-small-semibold text-light-1">{name}</h4>
                    <p className="text-small-regular text-gray-1">@{username}1</p>
                </div>
            </div>
            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
                View
            </Button>
        </article>
    )
}

export default UserCard;