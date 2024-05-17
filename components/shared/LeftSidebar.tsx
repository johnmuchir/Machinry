import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import LeftProfile from "../forms/LeftProfile";
import { profileTabs } from "@/constants";

interface Props {
    id: string
}
const LeftSidebar = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user?.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
        <section className='leftsidebar'>
            <div className=" flex flex-col gap-0 items-center w-[200px] ">
                <div className="mt-">
                <LeftProfile
                    accountId={userInfo?.id}
                    authUserId={user?.id}
                    name={userInfo?.name}
                    username={userInfo?.username}
                    imgUrl={userInfo?.image}
                    bio={userInfo?.bio}
                />
                </div>
            
                <Tabs>
                    <TabsList className='flex flex-col'>
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className='gap-5 -ml-4 flex items-center'>
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className='object-contain'
                                />
                                <p className='  text-small-medium'>{tab.label}</p>

                                {tab.label === "Threads" && (
                                    <p className=' rounded-sm bg-light-2 px-2 py-1 !text-small-medium'>
                                       {userInfo.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <div className=" flex flex-col gap-3 text-gray-500">
                    <Link href={`/following/${userInfo?.id}`} className="flex items-center gap-5">
                        <p className="ml-1  px-2 py-1 !text-small-medium">Following</p>
                        <p className="text-small-medium p-1 bg-light-2">{userInfo?.followers?.length}</p>
                    </Link>
                    <Link href={`/followers/${userInfo?.id}`} className="flex items-center gap-5">
                        <p className="ml-1 rounded-sm  px-2 py-1 !text-small-medium">Followers</p>
                        <p className="text-small-medium p-1 bg-light-2">{userInfo?.followers?.length}</p>
                    </Link>
                </div>
            </div>
        </section>
        </>
    );
};

export default LeftSidebar;