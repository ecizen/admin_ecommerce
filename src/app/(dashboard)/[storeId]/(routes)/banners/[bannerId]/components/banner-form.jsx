"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const BannerForm = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Banner" : "Buat Banner";
  const description = initialData ? "Edit Banner Toko" : "Buat Banner Toko";
  const toastMessage = initialData
    ? "Banner berhasil di edit"
    : "Banner berhasil dibuat";
  const action = initialData ? "Simpan Banner" : "Buat Banner";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.push(`/${params.storeId}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Cek kembali data yang diinput");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
      router.refresh();
      router.push("/");
      toast.success("Banner berhasil dihapus");
    } catch (error) {
      toast.error("Cek kembali data dan koneksi mu");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Label Banner"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BannerForm;
