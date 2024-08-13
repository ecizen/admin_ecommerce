"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

export const CategoryClient = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data.length})`}
          description="Atur Category Untuk Toko"
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new 
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API untuk Catgory" />
      <Separator />
      <ApiList namaIndikator="categories" idIndikator="categoryId" />
    </>
  );
};
