import db from "@/lib/db";

import { CategoryForm } from "./components/category-form";

const CatgoryPage = async ({ params: { categoryId, storeId } }) => {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const banners = await db.banner.findMany({
    where: {
      storeId: storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-8 px-6">
        <CategoryForm banners={banners} initialData={category} />
      </div>
    </div>
  );
};

export default CatgoryPage;
