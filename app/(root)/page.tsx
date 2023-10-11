import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";


export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();


  return (
    <>
      <h1 className='head-text text-left'></h1>
      <section className='mt-5 flex flex-col gap-2'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ): (
          <>
            {result.posts.map((post) => (
              <ThreadCard 
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}   