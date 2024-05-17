import Image from "next/image";
import Link from "next/link";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: "User" | "Community";
}

const LeftProfile = ({ accountId, authUserId, name, username, imgUrl, bio, type }: Props) => {
    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className='relative h-15 object-cover'>
                        <img
                            src={imgUrl}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-full w-12 h-12"
                        />
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-left text-small-semibold'>
                            {name}
                        </h2>
                        <p className='text-small-regular text-gray-1'>@{username}</p>
                    </div>
                </div>
            </div>
            <p className='mt-3 max-w-lg text-base-regular'>{bio}</p>
            <hr className='mt-3 h-0.5 w-full bg-dark-6' />

        </div>
    )
}

export default LeftProfile;