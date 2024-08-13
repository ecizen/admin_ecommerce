"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';


export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({row}) => row.original.bannerLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
  
    cell: ({row}) => <CellAction data={row.original} />
  }
]