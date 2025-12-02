import { useContext, useEffect, useState } from "react";
import { CategoryBadge, SignOutBadge } from "../../Campaign/CampaignDetail/components/CampaignDetail.styled.js";
import DataTable from "../../Common/DataTable/DataTable";
import { DeleteButton, EditButton, StatusBadge } from "../../Common/DataTable/DataTable.styled";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import Toast from "../../Common/Toast/Toast";
import { Button, Dropdown } from "react-bootstrap";

const AdminUsers = () => {

    const { auth } = useContext(AuthContext);
    const [data,setData] = useState([]);
    const [isEdited,setIsEdited] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmVariant, setConfirmVariant] = useState('info');
    const [selectUser, setSelectUser] = useState(0);
    const [dropDownName, setDropDownName] = useState('사용자 번호');
    const [orderBy, setOrderBy] = useState('memberNo');

    const [keyword,setKeyword] = useState('');

    // Toast 상태
    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
        variant: 'success'
    });

    const showToastMessage = (message, variant) => {
        setToast({ message, isVisible: true, variant });
    };


    useEffect(() => {

        // console.log(auth);

        axios.get(`http://localhost/admin/members?orderBy=${orderBy}&keyword=${keyword}`,{
            headers : {
               Authorization :  `Bearer ${auth.accessToken}`
            }
        }).then(result => {
            //console.log(result);
            setData([...result.data])
        }).catch(err => {
            console.error(err);
        })

        setIsEdited(false);
    },[isEdited, orderBy])



    const handleRestore = (memberNo) => {

        axios.put(`http://localhost/admin/members/restore?memberNo=${memberNo}`,{},{
            headers : {
               Authorization :  `Bearer ${auth.accessToken}`
            }
        }).then(result => {
            showToastMessage('성공적으로 복구되었습니다.', 'success');
        }).catch(err => {
            showToastMessage(err.response.data["error-message"]);
        })

        setIsEdited(true);
        
    }

    const handleDelete = (memberNo) => {

        axios.delete(`http://localhost/admin/members?memberNo=${memberNo}`,{
            headers : {
                Authorization : `Bearer ${auth.accessToken}`
            }
        }).then(result => {
            showToastMessage('성공적으로 탈퇴되었습니다.', 'success');
        }).catch(err => {
            showToastMessage(err.response.data["error-message"]);
        })

        setIsEdited(true);

    }

    const columns = [
        {
            header: 'NO',
            field: 'memberNo'
        },
        {
            header: '회원아이디',
            field: 'memberId',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '닉네임',
            field: 'nickName',
            render: (value) => <strong>{value}</strong>
        },  
        {
            header: '가입일',
            field: 'enrollDate',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '상태',
            field: 'status',
            render: (value) => (
                value === 'Y' ? 
                    <CategoryBadge>가입</CategoryBadge> 
                    :
                    <SignOutBadge>탈퇴</SignOutBadge>
            )
        },
        {
            header: '관리',
            field: 'memberNo' ,
            render: (value) => 
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    
                    {data.find(item => item.memberNo === value).status === 'N'? 
                    <EditButton onClick={() => (setSelectUser(value),setConfirmVariant('info'),setShowConfirm(true))}>
                        복구
                    </EditButton>
                    :
                    <DeleteButton onClick={() => (setSelectUser(value),setConfirmVariant('warning'),setShowConfirm(true))}>
                        탈퇴
                    </DeleteButton>
                    }
                </div>
        }
    ];

    return (
        <div>
            <h1>회원 관리</h1>
                {
                data.length !== 0 ?
                <DataTable
                    title="회원 목록"
                    columns={columns}
                    data={data}
                    icon="fas fa-leaf"
                    className="userTable"
                ></DataTable>
                :
                <p>
                    데이터가 존재하지 않습니다.
                    {keyword !== ''?
                        <Button variant="dark" onClick={()=>{(setKeyword(''),setIsEdited(true))}}>회원 목록 조회</Button>
                        :
                        <></>
                    }
                </p>
                }
    <Dropdown className="userDropDown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropDownName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={(e) => (setOrderBy('memberNo'), setDropDownName(e.target.innerHTML))}>사용자 번호</Dropdown.Item>
        <Dropdown.Item onClick={(e) => (setOrderBy('memberId'), setDropDownName(e.target.innerHTML))}>사용자 이름</Dropdown.Item>
        <Dropdown.Item onClick={(e) => (setOrderBy('nickName'), setDropDownName(e.target.innerHTML))}>닉네임</Dropdown.Item>
        <Dropdown.Item onClick={(e) => (setOrderBy('enrollDate'),setDropDownName(e.target.innerHTML))}>가입일</Dropdown.Item>
      </Dropdown.Menu>

    <div>
    <input type="text" placeholder="사용자 닉네임 검색" onChange={(e) => setKeyword(e.target.value)}/>
    <Button variant="primary" onClick={() => setIsEdited(true)}>검색</Button>
    </div>
    </Dropdown>

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmVariant === 'info' ? () => handleRestore(selectUser) : () => handleDelete(selectUser)}
                title={confirmVariant === 'info' ? '복구 확인' : '탈퇴 확인'}
                message= {confirmVariant === 'info' ? '회원을 복구시키겠습니까?' : '회원을 탈퇴시키겠습니까?'}
                confirmText= {confirmVariant === 'info' ? '복구' : '탈퇴'}
                cancelText="취소"
                variant= {confirmVariant}
            />

            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
                variant={toast.variant}
            />
        </div>
    );
};

export default AdminUsers;
