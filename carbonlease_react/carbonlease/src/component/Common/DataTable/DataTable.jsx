import { useEffect, useRef } from 'react';
import { DataTableContainer, TableCard, TableCardBody, TableCardHeader } from './DataTable.styled';

const DataTable = ({ 
    title = 'DataTable', 
    columns = [], 
    data = [],
    showIcon = true,
    icon = 'fas fa-table',
    onRowClick,
    className = "",
    searchComponent = null
}) => {

    const tableRef = useRef(null);

    return (
        <DataTableContainer>
            <TableCard>
                <TableCardHeader style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      {showIcon && <i className={`${icon} me-1`}></i>}
                      {title}
                    </div>
                    {searchComponent && (
                      <div>
                        {searchComponent}
                      </div>
                    )}
                </TableCardHeader>
                <TableCardBody>
                    <table ref={tableRef} className={className}>
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
                                
                            </tr>
                        </tfoot>
                    </table>
                </TableCardBody>
            </TableCard>
        </DataTableContainer>
    );
};

export default DataTable;
