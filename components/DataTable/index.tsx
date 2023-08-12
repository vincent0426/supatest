'use client';

import { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useConnectionAtom, useFormAtom, useResultAtom } from '@/atoms';
import { BeatLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { Input } from '../ui/input';
// const tempData: Payment[] = [
//   {
//     id: 'm5gr84i9',
//     amount: 316,
//     status: 'success',
//     email: 'ken99@yahoo.com',
//   },
//   {
//     id: '3u1reuv4',
//     amount: 242,
//     status: 'success',
//     email: 'Abe45@gmail.com',
//   },
//   {
//     id: 'derv1ws0',
//     amount: 837,
//     status: 'processing',
//     email: 'Monserrat44@gmail.com',
//   },
//   {
//     id: '5kma53ae',
//     amount: 874,
//     status: 'success',
//     email: 'Silas22@gmail.com',
//   },
//   {
//     id: 'bhqecj4p',
//     amount: 721,
//     status: 'failed',
//     email: 'carmella@hotmail.com',
//   },
// ];

// export type Payment = {
//   id: string
//   amount: number
//   status: 'pending' | 'processing' | 'success' | 'failed'
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [  
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'id',
//     header: 'ID',
//     cell: ({ row }) => <div>{row.getValue('id')}</div>,
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue('status')}</div>
//     ),
//   },
//   {
//     accessorKey: 'email',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
//   },
//   {
//     accessorKey: 'amount',
//     header: () => <div className="text-left">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue('amount'));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//       }).format(amount);

//       return <div className="text-left font-medium">{formatted}</div>;
//     },
//   },
//   {
//     id: 'actions',
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

type ColDef = {
  accessorKey: string
  header: string
  cell: ({ row }: { row: any }) => JSX.Element
}

export function DataTable() {
  const { formattedHeaders, setFormattedHeaders, formattedRows, setFormattedRows, isGenerating } = useResultAtom();
  const { url, anon } = useConnectionAtom();
  const { form }  = useFormAtom();
  const [headers, setHeaders] = useState<ColDef[]>([]);
  const [data, setData] = useState<[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (formattedHeaders && formattedRows) {
      // change all headers into 
      // {
      //   accessorKey: 'id',
      //   header: 'ID',
      //   cell: ({ row }) => <div>{row.getValue('id')}</div>,
      // },
      const headers = formattedHeaders.map((header: string) => {
        return {
          accessorKey: header,
          header: header,
          cell: ({ row }: { row:any }) => <div>{row.getValue(header)}</div>,
        };
      });
      
      setHeaders(headers);
    }
  }, [formattedHeaders, formattedRows]);
  
  const handleDeleteSelected = () => {

    // Assuming each row has a unique ID, you can filter out the selected rows
    // rowSelection will be something like {0: true, 1: true} if rows 0 and 1 are selected
    // only go through the rows that are selected

    const newRows = data.filter((row, index) => !rowSelection[index]);
    // Now set this new data (you may also need to update your state if you're managing it somewhere else)
    // You may also need to make API calls or do other actions to delete the rows permanently
    // For this example, I'll assume you have a state for the data and update it
    setData(newRows as any);
    // Clear row selections after deletion
    setRowSelection({});
  };
  
  const table = useReactTable({
    data: formattedRows,
    columns: headers,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  
  const handleConfirm = () => {
    insertData();
  };
  
  const insertData = async () => {
    try {
      const response = await fetch(`${url}/rest/v1/${form.table}`, {
        headers: {
          apikey: anon,
          Authorization: `Bearer ${anon}`,
          Prefer: 'return=minimal',
          'Content-Type': 'application/json'
        }, 
        method: 'POST',
        body: JSON.stringify(formattedRows)
      });
      if (!response.ok) {
        throw new Error('Error with fetching data');
      }
      
      setFormattedHeaders([]);
      setFormattedRows([]);
      toast.success('Data inserted successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }

  };
  
  const [editingCell, setEditingCell] = useState<any>(null);
  const [editedValue, setEditedValue] = useState('');
  
  // Step 2: Cell Double-Click Event
  const handleCellDoubleClick = (cellData: any) => {
    setEditingCell(cellData);
    setEditedValue(cellData.getValue(cellData.column.id));
  };
  
  // Step 4: Cell Blur Event
  const handleCellBlur = (event: any) => {
    event.preventDefault();
    if (editingCell) {
      const rowIndex = editingCell.row.id;
      const columnIndex = editingCell.column.id;
  
      if (event.key === 'Enter') {
        const newFormattedRows = {
          ...formattedRows,
          [rowIndex]: {
            ...formattedRows[rowIndex],
            [columnIndex]: editedValue,
          },
        };
        setFormattedRows(newFormattedRows);
      }
  
      setEditingCell(null);
      setEditedValue('');
    }
  };
  
  const handleCellKeyDown = (event: any, cell: any) => {
    if (event.key === 'Enter') {
      const rowIndex = cell.row.id;
      const columnIndex = cell.column.id;
  
      const newFormattedRows = [...formattedRows];
      newFormattedRows[rowIndex][columnIndex] = editedValue;
      setFormattedRows(newFormattedRows);
      
      setEditingCell(null);
      setEditedValue('');
      event.preventDefault(); // Prevent any default behavior
    }
  };
  
  // Render the input field if the cell is being edited
  const renderCellContent = (cell: any) => {
    const isEditing =
      editingCell &&
      editingCell.row.id === cell.row.id &&
      editingCell.column.id === cell.column.id;
  
    if (isEditing) {
      return (
        <Input
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          autoFocus
          onKeyDown={(e) => handleCellKeyDown(e, cell)}
          onBlur={(e) => handleCellBlur(e)}
        />
      );
    }
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };
  
  
  return (
    <div className="w-full">
      <Toaster />
      {/* Delete button for selection */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center justify-end py-4">
          <Button variant="destructive" onClick={handleDeleteSelected}>
            Delete
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onDoubleClick={() => handleCellDoubleClick(cell)}
                    >
                      {renderCellContent(cell)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="h-24 text-center"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <BeatLoader size={8} color="#4a5568" />
                    </div>
                  ) : (
                    <p>
                      No data found.{' '}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {formattedRows.length > 0 && (
        <div className="flex items-center justify-end py-4">
          <Button variant="default" onClick={handleConfirm}>
          Publish
          </Button>
        </div>
      )}
    </div>
  );
}
