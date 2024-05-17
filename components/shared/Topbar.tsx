import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";
import MobileNav from "../forms/MobileNav";
import Bottombar from "./Bottombar";

async function Topbar() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    
    return (
        <>
        <nav className="topbar">
            <Link href='/' className='flex items-center gap-1'>
               <Image 
                   src='/assets/icon.png' 
                   alt='logo' 
                   width={40}
                   height={40}
                   priority
                   className="rounded-full w-10 h-10" 
                />
            </Link>
            <Bottombar />
            <div className="flex gap-2">
                <Link href={`/create-thread/`} className=" md:hidden">
                    <Image
                       src='/assets/create.svg'
                        alt=""
                        width={24}
                        height={24}
                        className=" w-6 h-6 bg-slate-400 rounded-full p-1 "
                    />
                </Link>
                <Link href={`/activity`}>
                    <Image
                        src='/assets/bell.svg'
                        alt=""
                        width={24}
                        height={24}
                        className=" w-6 h-6 bg-slate-300 rounded-full p-0.5"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-2 ">
                <Link href={`/profile/${user?.id}`} className="">
                    <img
                        src={userInfo?.image}
                        alt='logo'
                        width={40}
                        height={40}
                        className='cursor-pointer w-9 h-9 rounded-full'
                    />
                </Link>
                <div>
                    <MobileNav />
                </div>
            </div>
        </nav>
        </>
    )
}

export default Topbar;
