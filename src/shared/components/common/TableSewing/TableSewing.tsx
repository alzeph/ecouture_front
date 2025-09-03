//import styles from './table-sewing.module.css';
import { DataTable, type DataTableProps } from 'mantine-datatable';


export type TableSewingProps<T> = DataTableProps<T>;

export const TableSewing = <T,>({records, ...rest }: TableSewingProps<T>) => {
  return (
   records && records.length > 0 ?  <DataTable
      pinFirstColumn
      pinLastColumn
      records={records && records.length > 0 ? records : []}
      styles={{
        root: {
          width: '100%',
          overflowX: 'auto',

        },
        table: {
          width: '100%',
          height: '100%',
          overflowX: 'auto',
        },
        pagination: {
          display: 'flex',
          justifyContent: 'right'
        }
      }}
      noRecordsText=""
      // noRecordsIcon={<></>}
      
      {...rest}
    /> : <></>
  );
};
