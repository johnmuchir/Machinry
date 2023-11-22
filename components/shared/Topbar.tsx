import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import Image from "next/image";

function Topbar() {
    return (
        <nav className="topbar">
            <Link href='/' className='flex items-center gap-1'>
               <Image 
                   src='/assets/pic 3.jpg' 
                   alt='logo' 
                   width={60}
                   height={50}
                   priority
                   className="rounded-lg" 
                />
               <p className='text-heading 3-bold text-light-1 max-xs:hidden'>Machinary</p>
            </Link>

            <OrganizationSwitcher
                appearance={{
                    baseTheme: dark,
                    elements: {
                        organizationSwitcherTrigger: "pt-2 px-2",
                    },
                }}
            />

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    <SignedIn>
                    <SignOutButton>
                    <div className='flex cursor-pointer'>
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