"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';



export const columns = [
  {
    accessorKey: "label",
    header: "Label",
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