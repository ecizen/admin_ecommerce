import React from 'react';
import db from '@/lib/db';

const DashboardPage = async ({ params }) => {
    // Fetch the store data based on storeId from params
    const store = await db.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return (
        <div>
           <p className='text-black'>{store?.name}</p> 
        </div>
    );
};

export default DashboardPage;
