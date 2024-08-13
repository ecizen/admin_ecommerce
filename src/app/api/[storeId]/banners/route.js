import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req, { params }) {
  const { storeId } = params;

  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Nama Banner diinput", { status: 400 });
    }
    if (!imageUrl) {
        return new NextResponse("URL Gambar perlu diinput", { status: 400 });
    }

    if (!storeId){
        return new NextResponse("Store ID dibutuhkan", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
        where: {
            id: storeId,
            userId 
        },
    })
    
    if(!storeByUserId){
        return new NextResponse("Unauthorized", { status: 403 });
    }
    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });


    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params : {storeId} }) {
  
    try {
  
      if (!storeId){
          return new NextResponse("Store ID dibutuhkan", { status: 400 });
      }
  
      const banner = await db.banner.findMany({
        where:{
            storeId
        }
      });
  
    
  
      return NextResponse.json(banner);
    } catch (error) {
      console.log("[BANNERS_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }

  