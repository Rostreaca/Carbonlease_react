import { useEffect, useRef } from 'react';
import { DataTableContainer, TableCard, TableCardBody, TableCardHeader } from './DataTable.styled';

const DataTable = ({ 
    title = 'DataTable', 
    columns = [], 
    data = [],
    showIcon = true,
    icon = 'fas fa-table',
    onRowClick,
}) => {

    const tableRef = useRef(null);

    // useEffect(() => {
    //     //console.log("얘가 안도는거 같은디?");
    //     if (tableRef.current && window.simpleDatatables && data.length > 0) {
    //         // 기존 DataTable 인스턴스 제거
    //         console.log(data)
    //         if (tableRef.current.dataTable) {
    //             tableRef.current.dataTable.destroy();
    //         }

    //         // 새로운 DataTable 생성
    //         const dataTable = new window.simpleDatatables.DataTable(tableRef.current, {
    //             searchable: true,
    //             fixedHeight: false,
    //             perPageSelect: false,
    //             paging: false,
    //             layout: {
    //                 top: "{search}",
    //                 bottom: ""
    //             },      
    //             labels: {
    //                 placeholder: "검색...",
    //                 noRows: "데이터가 없습니다"
    //             }
    //         });
    //         tableRef.current.dataTable = dataTable;
    //         //console.log(tableRef)
    //         return () => {
    //             if (tableRef.current?.dataTable) {
    //                 tableRef.current.dataTable.destroy();
    //             }
    //         };
    //     }
    // }, [data]);

    return (
        <DataTableContainer>
            <TableCard>
                <TableCardHeader>
                    {showIcon && <i className={`${icon} me-1`}></i>}
                    {title}
                </TableCardHeader>
                <TableCardBody>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index}>{column.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr 
                                    key={rowIndex}
                                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>
                                            {column.render
                                                ? column.render(row[column.field], row, rowIndex)
                                                : row[column.field]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
 
                        </tbody>
                        <tfoot>
                            <tr>
                                {/* {columns.map((column, index) => (
                                    <th key={index}>{column.header}</th>
                                ))} */}
                            </tr>
                        </tfoot>
                    </table>
                </TableCardBody>
            </TableCard>
        </DataTableContainer>
    );
};

export default DataTable;
