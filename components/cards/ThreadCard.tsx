import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThreads";
import Likes from "../forms/Likes";


interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  images: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  likes: [];
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  images,
  author,
  community,
  createdAt,
  likes,
  comments,
  isComment,
}: Props) {

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-3"
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-col gap-0'>
          <div className='flex items-center gap-2'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>
            <div className='flex w-full flex-col'>
              <Link href={`/profile/${author.id}`} className='w-fit'>
                <h4 className='cursor-pointer text-base-semibold text-light-1'>
                  {author.name}
                </h4>
              </Link>
              <p className="text-subtle-medium text-gray-1"> 
                {formatDateString(createdAt)}
              </p>
            </div>
          </div>

          <p className='mt-2 text-small-regular text-light-2'>{content}</p>
          {images && (
            <img
              src={images}
              alt={""}
              className="rounded-lg mt-2"
        
            />
          )}
 
 
          <div className={`${isComment && "mb-2"} mt-0 flex items-center gap-0`}>
            <div className='flex gap-4 mt-3 items-center'>
              
              <Likes threadId={JSON.stringify({})} userId={""} />
              
              <Link href={`/thread/${id}`}>
                <Image
                  src='/assets/reply.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </Link>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
              {!isComment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                  {comments.slice(0, 2).map((comment, index) => (
                    <Image
                      key={index}
                      src={comment.author.image}
                      alt={`user_${index}`}
                      width={24}
                      height={24}
                      className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                    />
                  ))}

                  <Link href={`/thread/${id}`}>
                    <p className='mt-1 text-subtle-medium text-gray-1'>
                      {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                    </p>
                  </Link>
                </div>
              )}
              
          </div> 
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

     
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-3 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={20}
            height={20}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;