
import { CategoryClient } from "./components/client";
import db from "@/lib/db";
import {format} from 'date-fns'

const CategoryPage = async ({params}) =>{

    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
        include:{
            banner: true,
        },
        orderBy:{
            createdAt: 'desc', 
        }
    })

    const formatedCategories =  categories.map((item)=>({
        id:item.id,
        name:item.name,
        bannerLabel:item.banner.label,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    })) 

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-1 p-8 pt-6">
                <CategoryClient data={formatedCategories}/>
            </div>
        </div>
    )
}

export default CategoryPage;