import db from "@/lib/db";
import { ProductForm } from "./components/product-form";

const ProductPage = async({params : {productId, storeId}}) => {
    const product =  await db.product.findUnique({
        where:{
            id: productId,
        },
        include:{
            images: true
        },
    })

    const categories = await db.category.findMany({
        where:{
            storeId: storeId
        },
        orderBy:{
            name: 'asc',
        }
    })
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-8 px-6">
                <ProductForm
                    initialData={product} categories={categories}
                />
            </div>
           
        </div>
    )
}

export default ProductPage;