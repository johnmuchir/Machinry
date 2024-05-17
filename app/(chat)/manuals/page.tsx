import { Categories } from "@/components/chat/Categories";
import { Companions } from "@/components/chat/Companions";
import { SearchInput } from "@/components/chat/SearchInput";
import prismadb from "@/lib/prismadb"

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const Page = async ({
  searchParams
}: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true,
        }
      }
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="w-full grid gap-3 ">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default Page