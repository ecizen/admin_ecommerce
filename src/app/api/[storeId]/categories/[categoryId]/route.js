import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, { params: {  categoryId } }) {
    try {
      if (!categoryId) {
        return NextResponse.json(
          { message: "Category id dibutuhkan" },
          { status: 400 }
        );
      }
  
      const category = await db.category.findUnique({
        where: {
          id: categoryId,
        },
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log("[CATEGORY_GET]", error);
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
  }

export async function PATCH(req, { params: { storeId, categoryId } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, bannerId } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    if (!name) {
      return NextResponse.json(
        { message: "Harus menginput name" },
        { status: 400 }
      );
    }
    if (!bannerId) {
      return NextResponse.json(
        { message: "Harus menginput bannerId" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category id dibutuhkan" },
        { status: 400 }
      );
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await db.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        bannerId
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params: { storeId, categoryId } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!categoryId) {
      return NextResponse.json(
        { message: "Category id dibutuhkan" },
        { status: 400 }
      );
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await db.category.deleteMany({
      where: {
        id:categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}



