
import { BannerClient } from "./components/client";
import db from "@/lib/db";

import {format} from 'date-fns'


const BannesPage = async ({params}) =>{

    const banners = await db.banner.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy:{
            createdAt: 'desc', 
        }
    })

    const formatedBanners =  banners.map((item)=>({
        id:item.id,
        label:item.label,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    })) 


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-1 p-8 pt-6">
                <BannerClient data={formatedBanners}/>
            </div>
        </div>
    )
}

export default BannesPage;