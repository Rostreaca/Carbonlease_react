
import DataTable from '../../../../Common/DataTable/DataTable';
import {
    ButtonGroup,
    CategoryBadge,
    DeleteButton,
    EditButton,
    StatusBadge,
    RestoreButton
} from '../../../../Common/DataTable/DataTable.styled';

const AdminCampaignList = ({ campaigns, onEdit, onHide, onDelete, onRestore }) => {
    // campaigns 데이터 구조 전체를 확인
    console.log('캠페인 데이터 구조:', campaigns);
    
    const columns = [
        {
            header: '순번',
            field: 'campaignNo'
        },
        {
            header: '캠페인명',
            field: 'campaignTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '카테고리명',
            field: 'categoryName',
            render: (value, row) => <CategoryBadge>{row.category?.categoryName || ''}</CategoryBadge>
        },
        {
            header: '상태',
            field: 'displayStatus',
            render: (value, row) => (
                <StatusBadge $status={row.displayStatus}>{row.displayStatus}</StatusBadge>
            )
        },
        {
            header: '시작일',
            field: 'startDate'
        },
        {
            header: '종료일',
            field: 'endDate'
        },
        {
            header: '관리',
            field: 'campaignNo',
            render: (value, row) => (
                <ButtonGroup>
                    {row.displayStatus === '숨김' ? (
                        <RestoreButton onClick={() => onRestore(value)}>
                            복구
                        </RestoreButton>
                    ) : (
                        <DeleteButton onClick={() => onHide(value)}>
                            숨김
                        </DeleteButton>
                    )}
                    <EditButton onClick={() => onEdit(row)}>수정</EditButton>
                    <DeleteButton onClick={() => onDelete(value)} style={{marginLeft: '4px'}}>
                        삭제
                    </DeleteButton>
                </ButtonGroup>
            )
        }
    ];


    return (

		<DataTable 
			title="캠페인 목록"
			columns={columns}
			data={campaigns}
		/>
    );
};

export default AdminCampaignList;
