import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.action";
import { fetchPosts } from "@/lib/actions/thread.action";
import ThreadSearchbar from "@/components/forms/ThreadSearchbar";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts({
    searchString: searchParams.q || '',
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 0,
  });

  return (
    <>
      
      <h1 className='head-text text-left'></h1>
      <ThreadSearchbar routeType="" />
      <section className='mt-2 flex flex-col gap-4'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No posts found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                images={post.images}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.children}
                
              />
            ))}
          </>
        )}
      </section>

    </>
  );
}

export default Home;