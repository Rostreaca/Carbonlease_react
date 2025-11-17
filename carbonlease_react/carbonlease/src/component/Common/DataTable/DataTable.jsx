import { useEffect, useRef } from 'react';
import { DataTableContainer, TableCard, TableCardBody, TableCardHeader } from './DataTable.styled';

const DataTable = ({ 
    title = 'DataTable', 
    columns = [], 
    data = [],
    showIcon = true,
    icon = 'fas fa-table',
    onRowClick = null  // 행 클릭 핸들러 옵션
}) => {

    const tableRef = useRef(null);

    useEffect(() => {
        const tableElement = tableRef.current;
        
        if (tableElement && window.simpleDatatables && data.length > 0) {
            // 기존 DataTable 인스턴스 제거
            if (tableElement.dataTable) {
                tableElement.dataTable.destroy();
            }

            // 새로운 DataTable 생성
            const dataTable = new window.simpleDatatables.DataTable(tableElement, {
                searchable: true,
                fixedHeight: false,
                perPageSelect: false,
                paging: false,
                layout: {
                    top: "{search}",
                    bottom: ""
                },
                labels: {
                    placeholder: "검색...",
                    noRows: "데이터가 없습니다"
                }
            });

            // 행 클릭 이벤트 추가 (Simple DataTables가 DOM을 재구성한 후)
            if (onRowClick) {
                const tbody = tableElement.querySelector('tbody');
                if (tbody) {
                    tbody.addEventListener('click', (e) => {
                        const clickedRow = e.target.closest('tr');
                        if (clickedRow) {
                            const rowIndex = Array.from(tbody.children).indexOf(clickedRow);
                            if (rowIndex >= 0 && data[rowIndex]) {
                                onRowClick(data[rowIndex], rowIndex);
                            }
                        }
                    });

                    // 행에 클릭 가능 클래스 추가
                    const rows = tbody.querySelectorAll('tr');
                    rows.forEach(row => {
                        row.classList.add('clickable');
                    });
                }
            }

            tableElement.dataTable = dataTable;

            return () => {
                if (tableElement?.dataTable) {
                    tableElement.dataTable.destroy();
                }
            };
        }
    }, [data, onRowClick]);

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
                                {columns.map((column, index) => (
                                    <th key={index}>{column.header}</th>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </TableCardBody>
            </TableCard>
        </DataTableContainer>
    );
};

export default DataTable;
