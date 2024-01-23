import { currentUser, SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";

async function Topbar() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    
    return (
        <nav className="topbar">
            <Link href='/' className='flex items-center gap-1'>
               <Image 
                   src='/assets/icon.png' 
                   alt='logo' 
                   width={40}
                   height={40}
                   priority
                   className="rounded-lg w-9 h-9" 
                />
               <p className='cursor-pointer p-1 overflow-hidden text-[12px] rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 ... max-xs:hidden'>Machinry</p>
            </Link>
            
            <Link href={`/profile/${user?.id}`}>
            <img
                src={userInfo?.image}
                alt='image'
                width={30}
                height={30}
                className='cursor-pointer w-9 h-9 rounded-full'
              />
            </Link>

            {/*<OrganizationSwitcher
                appearance={{
                    baseTheme: dark,
                    elements: {
                        organizationSwitcherTrigger: "pt-2 px-2",
                    },
                }}
            />*/}

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    <SignedIn>
                    <SignOutButton>
                    <div className='flex text-light-3 cursor-pointer'>
                        <Image
                           src='/assets/logout.svg'
                           alt='logout'
                           width={24}
                           height={24}
                        />
                    </div>
                    </SignOutButton>
                    </SignedIn>
                </div>
                
            </div>
        </nav>
    )
}

export default Topbar;
