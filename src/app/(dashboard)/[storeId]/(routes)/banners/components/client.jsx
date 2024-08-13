"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

export const BannerClient = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banner (${data.length})`}
          description="Atur Banner Untuk Toko"
        />
        <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new banner
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
      <Heading title="API" description="API untuk Banners" />
      <Separator />
      <ApiList namaIndikator="banners" idIndikator="bannerId" />
    </>
  );
};
