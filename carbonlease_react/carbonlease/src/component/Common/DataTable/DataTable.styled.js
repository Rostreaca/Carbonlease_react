import styled from 'styled-components';

export const PageHeader = styled.div`
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;

    h1 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 600;
        color: #212529;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;  
    gap: 0.5rem;
`;   

export const CreateButton = styled.button`
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    background-color: #198754;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #157347;
    }

    &:active {
        background-color: #146c43;
    }

    i {
        font-size: 0.875rem;
    }
`;

export const EditButton = styled.button`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #0d6efd;
    border-radius: 0.25rem;
    background-color: #0d6efd;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover {
        background-color: #0b5ed7;
        border-color: #0a58ca;
    }

    &:active {
        background-color: #0a58ca;
        border-color: #0a53be;
    }
`;

// 복구 버튼 (초록색)
export const RestoreButton = styled.button`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #0d6efd;
    border-radius: 0.25rem;
    background-color: #0d6efd;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
    &:hover {
        background-color: #0b5ed7;
        border-color: #0a58ca;
    }
    &:active {
        background-color: #0a58ca;
        border-color: #0a53be;
    }
`;

export const DeleteButton = styled.button`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #dc3545;
    border-radius: 0.25rem;
    background-color: #dc3545;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
    
        &:disabled {
            background-color: #e0e0e0;
            border-color: #bdbdbd;
            color: #888;
            cursor: not-allowed;
            border: 1px solid #e0e0e0;
        }

        &:not(:disabled):hover {
            background-color: #bb2d3b;
            border-color: #b02a37;
        }

        &:not(:disabled):active {
            background-color: #b02a37;
            border-color: #a52834;
        }
`;

export const DataTableContainer = styled.div`
    padding-top: 1.5rem;
`;

export const TableCard = styled.div`
    background: #fff;
    border-radius: 0.375rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    margin-bottom: 1.5rem;
`;

export const TableCardHeader = styled.div`
    padding: 0.75rem 1.25rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-weight: 500;
    color: #212529;

    i {
        color: #6c757d;
    }
`;


export const TableCardBody = styled.div`

    padding: 1.25rem;

    /* 반응형: 테이블이 화면보다 넓어지면 가로 스크롤, 위아래 깨짐 방지 */
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100%;
    white-space: nowrap;

    table {
        width: 100%;
        min-width: 600px;
        margin-bottom: 1rem;
        color: #212529;
        border-collapse: collapse;

        thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            background-color: #f8f9fa;
        }

        tbody td {
            padding: 0.75rem;
            border-top: 1px solid #dee2e6;
            vertical-align: middle;
            
            button {
                vertical-align: middle;
            }
            
            div {
                display: flex;
                align-items: center;
            }
        }

        tbody tr {
            &.clickable {
                cursor: pointer;
                transition: background-color 0.2s ease;
                
                &:hover {
                    background-color: #f8f9fa !important;
                }
            }
            
            &:hover {
                background-color: #f8f9fa;
            }
        }

        tfoot th {
            vertical-align: bottom;
            border-top: 2px solid #dee2e6;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            background-color: #f8f9fa;
        }
    }

    /* DataTables 스타일 오버라이드 */
    .dataTable-wrapper {
        .dataTable-top {
            padding: 0 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .dataTable-search {
            input {
                padding: 0.375rem 0.75rem;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                font-size: 1rem;

                &:focus {
                    outline: none;
                    border-color: #86b7fe;
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                }
            }
        }

        .dataTable-dropdown {
            label {
                margin-right: 0.5rem;
            }

            select {
                padding: 0.375rem 2rem 0.375rem 0.75rem;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                font-size: 1rem;

                &:focus {
                    outline: none;
                    border-color: #86b7fe;
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                }
            }
        }

        .dataTable-bottom {
            padding: 1rem 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .dataTable-info {
            color: #6c757d;
            font-size: 0.875rem;
        }

        .dataTable-pagination {
            ul {
                display: flex;
                list-style: none;
                padding: 0;
                margin: 0;
                gap: 0.25rem;

                li {
                    a {
                        display: block;
                        padding: 0.375rem 0.75rem;
                        border: 1px solid #dee2e6;
                        border-radius: 0.25rem;
                        color: #0d6efd;
                        text-decoration: none;
                        cursor: pointer;

                        &:hover {
                            background-color: #e9ecef;
                            border-color: #dee2e6;
                        }
                    }

                    &.active a {
                        background-color: #0d6efd;
                        border-color: #0d6efd;
                        color: #fff;
                    }

                    &.disabled a {
                        color: #6c757d;
                        pointer-events: none;
                        background-color: #fff;
                        border-color: #dee2e6;
                    }
                }
            }
        }
    }
`;

// Form Styles
export const FormContainer = styled.div`
    ${'' /* padding: 1.5rem; */}
`;

export const FormCard = styled.div`
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    margin-bottom: 1.5rem;
`;

export const FormCardHeader = styled.div`
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f8f9fa;
    border-radius: 0.5rem 0.5rem 0 0;

    h5 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #212529;
    }
`;

export const FormCardBody = styled.div`
    padding:1.15rem 1rem;
`;

export const FormButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #dee2e6;
`;

export const SubmitButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
    background-color: #198754;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
        background-color: #157347;
    }

    &:active {
        background-color: #146c43;
    }

    i {
        font-size: 0.875rem;
    }
`;

export const CancelButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
        background-color: #f8f9fa;
        border-color: #adb5bd;
    }

    &:active {
        background-color: #e9ecef;
    }

    i {
        font-size: 0.875rem;
    }
`;

// Badge Styles
export const CategoryBadge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: #e7f3ff;
    color: #0066cc;
`;

export const StatusBadge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: ${props => {
        switch (props.$status) {
            case '정상':
                return '#d4edda'; // 연녹색
            case '종료':
                return '#e2e3e5'; // 연회색
            case '숨김':
                return '#f8d7da'; // 연빨강
            case '삭제':
                return '#f5f5f5'; // 밝은 회색
            case '모집예정':
                return '#fff3cd'; // 연노랑
            default:    
                return '#e9ecef';
        }
    }};
    color: ${props => {
        switch (props.$status) {
            case '정상':
                return '#155724'; // 진녹색
            case '종료':
                return '#6c757d'; // 중간 회색
            case '숨김':
                return '#721c24'; // 진빨강
            case '삭제':
                return '#888'; // 중간 회색
            case '모집예정':
                return '#856404'; // 진노랑
            default:
                return '#495057';
        }
    }};
`;

export const ImagePreviewBox = styled.div`
  margin-top: 0.75rem;

  span {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: #6c757d;
  }

  img {
    max-width: 240px;
    max-height: 160px;
    border-radius: 0.25rem;
    border: 1px solid #dee2e6;
    object-fit: cover;
  }
`;
