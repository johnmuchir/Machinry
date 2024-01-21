import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comments";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string }}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread = await fetchThreadById(params.id);

    return (

        <section className="relative">
            <div>
                <ThreadCard
                    key={thread?._id}
                    id={thread?._id}
                    currentUserId={user?.id || ""}
                    parentId={thread?.parentId}
                    content={thread?.text}
                    images={thread?.images}  
                    author={thread?.author}
                    community={thread?.community}
                    createdAt={thread?.createdAt}
                    comments={thread?.children} 
                    likes={thread?.children} 
                                
                />
            </div>
            <div className="mt-3">
                <Comment
                    threadId={thread?.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
        
            <div className="mt-7">
                {thread?.children.map((childItem: any) => (
                    <ThreadCard 
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id || ""}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        images={childItem.images}  
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment   
                        likes={childItem.children}
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;