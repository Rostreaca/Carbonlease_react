import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DataTable from '../DataTable/DataTable';
import FormField from '../Form/FormField';
import PageTitle from '../Layout/PageTitle/PageTitle';
import Loading from '../Loading/Loading';
import PageContent from '../PageContent/PageContent';
import Pagination from '../Pagination/Pagination';
import Toast from '../Toast/Toast';
import {
    CodeBlock,
    ComponentSection,
    DemoButton,
    DemoContainer,
    GuideContainer,
    PropsTable,
    SectionTitle,
    SubTitle,
    TabButton,
    TabContainer,
    TabContent,
    VariantButtons
} from './ComponentGuide.styled';

const ComponentGuide = () => {

    // DataTable 행 클릭 핸들러 _ 페이지 이동
    const navigate = useNavigate();


    // Tab 상태
    const [activeTab, setActiveTab] = useState('dialogs');

    // Alert 상태
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');

    // ConfirmDialog 상태
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmVariant, setConfirmVariant] = useState('danger');

    // Toast 상태
    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
        variant: 'success'
    });

    // Pagination 상태 (더미 데이터)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

    const updatePageNumbers = (page, total) => {
        const maxVisible = 5;
        const blockNumber = Math.ceil(page / maxVisible);
        const start = (blockNumber - 1) * maxVisible + 1;
        const end = Math.min(blockNumber * maxVisible, total);
        
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        updatePageNumbers(1, totalPages);
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
        }
    };
    
    const handlePageClick = (page) => {
        setCurrentPage(page);
        updatePageNumbers(page, totalPages);
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
        }
    };
    
    const handleLastPage = () => {
        setCurrentPage(totalPages);
        updatePageNumbers(totalPages, totalPages);
    };

    // Loading 상태
    const [showLoading, setShowLoading] = useState(false);

    // Form 상태
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        message: '',
        file: null,
        date: ''
    });
    const [fileName, setFileName] = useState('');

    // Table 더미 데이터 (캠페인)
    const tableData = [
        { campaignNo: 1, campaignTitle: '친환경 라이프스타일 캠페인', category: '환경', status: '진행중', participantCount: 150 },
        { campaignNo: 2, campaignTitle: '탄소중립 실천하기', category: '기술', status: '모집중', participantCount: 89 },
        { campaignNo: 3, campaignTitle: '재생에너지 활용법', category: '에너지', status: '종료', participantCount: 230 }
    ];

    const tableColumns = [
        { header: '번호', field: 'campaignNo' },
        { header: '캠페인명', field: 'campaignTitle' },
        { header: '카테고리', field: 'category' },
        { header: '상태', field: 'status' },
        { header: '참가자 수', field: 'participantCount' }
    ];

    // DataTable 행 클릭 핸들러 _ 페이지 이동
    const handleRowClick = (rowData) => {
        console.log('클릭된 캠페인 : ', rowData);

        setTimeout(() => {
            navigate(`/campaigns/detail/${rowData.campaignNo}`); // 이동 할 상세 페이지 경로
        }, 1000);
    };

    const showToastMessage = (message, variant = 'success') => {
        setToast({ message, isVisible: true, variant });
    };

    const handleConfirm = () => {
        const message = confirmVariant === 'danger'
            ? '삭제되었습니다!'
            : confirmVariant === 'warning'
            ? '작업이 완료되었습니다!'
            : '확인 버튼을 눌렀습니다!';
        
        showToastMessage(message, 'success');
    };

    const handleShowLoading = () => {
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            showToastMessage('데이터 로딩 완료!', 'success');
        }, 3000);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, file: files[0] }));
            setFileName(files[0].name);
        }
    };

    return (
        <>
            <PageTitle
                title="공통 컴포넌트 가이드"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '가이드', current: true }
                ]}
            />
            <PageContent>
                <GuideContainer>
                    <TabContainer>
                        <TabButton 
                            $active={activeTab === 'dialogs'} 
                            onClick={() => setActiveTab('dialogs')}
                        >
                            Dialog & Alert
                        </TabButton>
                        <TabButton 
                            $active={activeTab === 'form'} 
                            onClick={() => setActiveTab('form')}
                        >
                            Form
                        </TabButton>
                        <TabButton 
                            $active={activeTab === 'table'} 
                            onClick={() => setActiveTab('table')}
                        >
                            Table
                        </TabButton>
                    </TabContainer>

                    {/* Dialog & Alert Tab */}
                    <TabContent $active={activeTab === 'dialogs'}>
                    {/* Toast */}
                    <ComponentSection>
                        <SectionTitle>Toast</SectionTitle>
                        <p>사용자에게 짧은 알림 메시지를 표시하는 컴포넌트입니다. 3초 후 자동으로 사라집니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="success"
                                    onClick={() => showToastMessage('성공 메시지입니다!', 'success')}
                                >
                                    Success Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => showToastMessage('에러가 발생했습니다!', 'error')}
                                >
                                    Error Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => showToastMessage('경고 메시지입니다!', 'warning')}
                                >
                                    Warning Toast
                                </DemoButton>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => showToastMessage('정보 메시지입니다!', 'info')}
                                >
                                    Info Toast
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>표시할 메시지</td>
                                </tr>
                                <tr>
                                    <td>isVisible</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Toast 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'success'</td>
                                    <td>Toast 스타일 (success, error, warning, info)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Toast from './Toast';

const [toast, setToast] = useState({
    message: '',
    isVisible: false,
    variant: 'success'
});

const showToast = (message, variant = 'success') => {
    setToast({ message, isVisible: true, variant });
};

// 사용
showToast('저장되었습니다!', 'success');

// JSX
<Toast
    message={toast.message}
    isVisible={toast.isVisible}
    onClose={() => setToast({ ...toast, isVisible: false })}
    variant={toast.variant}
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Alert */}
                    <ComponentSection>
                        <SectionTitle>Alert</SectionTitle>
                        <p>사용자에게 중요한 정보를 알리는 모달 다이얼로그입니다. 확인 버튼 하나만 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => {
                                        setAlertVariant('info');
                                        setShowAlert(true);
                                    }}
                                >
                                    Info Alert
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => {
                                        setAlertVariant('warning');
                                        setShowAlert(true);
                                    }}
                                >
                                    Warning Alert
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => {
                                        setAlertVariant('danger');
                                        setShowAlert(true);
                                    }}
                                >
                                    Danger Alert
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>show</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Alert 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Alert 제목</td>
                                </tr>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Alert 메시지 내용</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'info'</td>
                                    <td>Alert 스타일 (info, warning, danger)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Alert from './Alert';

const [showAlert, setShowAlert] = useState(false);

// JSX
<Alert
    show={showAlert}
    onClose={() => setShowAlert(false)}
    title="알림"
    message="입력한 내용이 저장되었습니다."
    variant="info"
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* ConfirmDialog */}
                    <ComponentSection>
                        <SectionTitle>ConfirmDialog</SectionTitle>
                        <p>사용자의 확인이 필요한 작업에 사용하는 모달 다이얼로그입니다. 취소/확인 두 개의 버튼이 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <VariantButtons>
                                <DemoButton
                                    $variant="info"
                                    onClick={() => {
                                        setConfirmVariant('info');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Info Confirm
                                </DemoButton>
                                <DemoButton
                                    $variant="warning"
                                    onClick={() => {
                                        setConfirmVariant('warning');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Warning Confirm
                                </DemoButton>
                                <DemoButton
                                    $variant="error"
                                    onClick={() => {
                                        setConfirmVariant('danger');
                                        setShowConfirm(true);
                                    }}
                                >
                                    Danger Confirm
                                </DemoButton>
                            </VariantButtons>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>show</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>Dialog 표시 여부</td>
                                </tr>
                                <tr>
                                    <td>onClose</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>취소/닫기 이벤트 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onConfirm</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>확인 버튼 클릭 핸들러</td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Dialog 제목</td>
                                </tr>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Dialog 메시지 내용</td>
                                </tr>
                                <tr>
                                    <td>content</td>
                                    <td>string</td>
                                    <td>-</td>
                                    <td>Dialog 추가 내용 추가</td>
                                </tr>
                                <tr>
                                    <td>confirmText</td>
                                    <td>string</td>
                                    <td>'확인'</td>
                                    <td>확인 버튼 텍스트</td>
                                </tr>
                                <tr>
                                    <td>cancelText</td>
                                    <td>string</td>
                                    <td>'취소'</td>
                                    <td>취소 버튼 텍스트</td>
                                </tr>
                                <tr>
                                    <td>variant</td>
                                    <td>string</td>
                                    <td>'info'</td>
                                    <td>Dialog 스타일 (info, warning, danger)</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const [showConfirm, setShowConfirm] = useState(false);

const handleDelete = () => {
    // 삭제 로직
    console.log('삭제되었습니다');
};

// JSX
<ConfirmDialog
    show={showConfirm}
    onClose={() => setShowConfirm(false)}
    onConfirm={handleDelete}
    title="게시글 삭제"
    message="정말로 이 게시글을 삭제하시겠습니까?"
    confirmText="삭제"
    cancelText="취소"
    variant="danger"
    content={<input type="text" placeholder="사유를 입력하세요" />}
/>`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Loading */}
                    <ComponentSection>
                        <SectionTitle>Loading</SectionTitle>
                        <p>데이터를 불러오는 동안 로딩 스피너를 표시하는 컴포넌트입니다. 메시지, 높이, 크기 등을 커스터마이징할 수 있습니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <DemoButton
                                $variant="info"
                                onClick={handleShowLoading}
                                disabled={showLoading}
                            >
                                {showLoading ? '로딩 중...' : 'Loading 테스트 (3초)'}
                            </DemoButton>
                            {showLoading && (
                                <div style={{ marginTop: '20px' }}>
                                    <Loading message="데이터를 불러오는 중..." minHeight="200px" />
                                </div>
                            )}
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>message</td>
                                    <td>string</td>
                                    <td>'로딩 중...'</td>
                                    <td>로딩 중 표시할 메시지</td>
                                </tr>
                                <tr>
                                    <td>minHeight</td>
                                    <td>string</td>
                                    <td>'400px'</td>
                                    <td>로딩 컨테이너의 최소 높이</td>
                                </tr>
                                <tr>
                                    <td>size</td>
                                    <td>string</td>
                                    <td>'50px'</td>
                                    <td>스피너의 크기</td>
                                </tr>
                                <tr>
                                    <td>fontSize</td>
                                    <td>string</td>
                                    <td>'16px'</td>
                                    <td>메시지의 글자 크기</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Loading from './Loading';

const [loading, setLoading] = useState(false);

const fetchData = () => {
    setLoading(true);
    getCampaignList(page, 6)
        .then(response => {
            setCampaigns(response.campaigns);
        })
        .catch(error => {
            console.error('에러:', error);
        })
        .finally(() => {
            setLoading(false);
        });
};

// JSX
{loading ? (
    <Loading 
        message="캠페인 정보를 불러오는 중..." 
        minHeight="400px"
        size="50px"
        fontSize="16px"
    />
) : (
    <div>데이터 표시</div>
)}`}
                        </CodeBlock>
                    </ComponentSection>

                    {/* Pagination */}
                    <ComponentSection>
                        <SectionTitle>Pagination</SectionTitle>
                        <p>페이지네이션을 구현하는 컴포넌트입니다. 현재 페이지를 기준으로 이전/다음 페이지 이동이 가능합니다.</p>

                        <SubTitle>사용 예시</SubTitle>
                        <DemoContainer>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageNumbers={pageNumbers}
                                onFirstPage={handleFirstPage}
                                onPrevPage={handlePrevPage}
                                onPageClick={handlePageClick}
                                onNextPage={handleNextPage}
                                onLastPage={handleLastPage}
                            />
                            <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
                                현재 페이지: {currentPage} / {totalPages}
                            </p>
                        </DemoContainer>

                        <SubTitle>Props</SubTitle>
                        <PropsTable>
                            <thead>
                                <tr>
                                    <th>Props</th>
                                    <th>타입</th>
                                    <th>기본값</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>currentPage</td>
                                    <td>number</td>
                                    <td>1</td>
                                    <td>현재 페이지 번호</td>
                                </tr>
                                <tr>
                                    <td>totalPages</td>
                                    <td>number</td>
                                    <td>1</td>
                                    <td>전체 페이지 수</td>
                                </tr>
                                <tr>
                                    <td>pageNumbers</td>
                                    <td>array</td>
                                    <td>[]</td>
                                    <td>표시할 페이지 번호 배열 (Spring Boot에서 계산)</td>
                                </tr>
                                <tr>
                                    <td>onFirstPage</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>첫 페이지 이동 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onPrevPage</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>이전 페이지 이동 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onPageClick</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>페이지 클릭 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onNextPage</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>다음 페이지 이동 핸들러</td>
                                </tr>
                                <tr>
                                    <td>onLastPage</td>
                                    <td>function</td>
                                    <td>-</td>
                                    <td>마지막 페이지 이동 핸들러</td>
                                </tr>
                            </tbody>
                        </PropsTable>

                        <SubTitle>코드 예시</SubTitle>
                        <CodeBlock>
{`import { useState } from 'react';
import Pagination from './Pagination';

const [currentPage, setCurrentPage] = useState(1);
const [pageNumbers, setPageNumbers] = useState([]);
const [totalPages, setTotalPages] = useState(1);

// Spring Boot API 응답 예시:
// { content: [...], totalPages: 10, currentPage: 1, pageNumbers: [1,2,3,4,5] }

const fetchData = async (page) => {
    const response = await api.get('/campaigns?page=' + page);
    setCurrentPage(response.currentPage);
    setTotalPages(response.totalPages);
    setPageNumbers(response.pageNumbers);
};

const handleFirstPage = () => fetchData(1);
const handlePrevPage = () => fetchData(currentPage - 1);
const handlePageClick = (page) => fetchData(page);
const handleNextPage = () => fetchData(currentPage + 1);
const handleLastPage = () => fetchData(totalPages);

// JSX
<Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    pageNumbers={pageNumbers}
    onFirstPage={handleFirstPage}
    onPrevPage={handlePrevPage}
    onPageClick={handlePageClick}
    onNextPage={handleNextPage}
    onLastPage={handleLastPage}
/>`}
                        </CodeBlock>
                    </ComponentSection>
                    </TabContent>

                    {/* Form Tab */}
                    <TabContent $active={activeTab === 'form'}>
                        <ComponentSection>
                            <SectionTitle>FormField</SectionTitle>
                            <p>다양한 타입의 입력 폼을 제공하는 재사용 가능한 컴포넌트입니다. text, textarea, select, file, date 타입을 지원합니다.</p>

                            <SubTitle>사용 예시</SubTitle>
                            <DemoContainer style={{ maxWidth: '600px' }}>
                                <FormField
                                    label="이름"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="이름을 입력하세요"
                                    required
                                />
                                <FormField
                                    label="카테고리"
                                    type="select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    options={[
                                        { value: '환경', label: '환경' },
                                        { value: '기술', label: '기술' },
                                        { value: '사회', label: '사회' }
                                    ]}
                                    required
                                />
                                <FormField
                                    label="메시지"
                                    type="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    placeholder="메시지를 입력하세요"
                                    rows={4}
                                />
                                <FormField
                                    label="파일 첨부"
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    fileName={fileName}
                                />
                                <FormField
                                    label="날짜"
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleFormChange}
                                />
                            </DemoContainer>

                            <SubTitle>Props</SubTitle>
                            <PropsTable>
                                <thead>
                                    <tr>
                                        <th>Props</th>
                                        <th>타입</th>
                                        <th>기본값</th>
                                        <th>설명</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>label</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>필드 레이블</td>
                                    </tr>
                                    <tr>
                                        <td>type</td>
                                        <td>string</td>
                                        <td>'text'</td>
                                        <td>입력 타입 (text, textarea, select, file, date)</td>
                                    </tr>
                                    <tr>
                                        <td>name</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>필드 이름</td>
                                    </tr>
                                    <tr>
                                        <td>value</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>필드 값</td>
                                    </tr>
                                    <tr>
                                        <td>onChange</td>
                                        <td>function</td>
                                        <td>-</td>
                                        <td>값 변경 핸들러</td>
                                    </tr>
                                    <tr>
                                        <td>error</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>에러 메시지</td>
                                    </tr>
                                    <tr>
                                        <td>required</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>필수 입력 여부 (빨간 * 표시)</td>
                                    </tr>
                                    <tr>
                                        <td>placeholder</td>
                                        <td>string</td>
                                        <td>''</td>
                                        <td>placeholder 텍스트</td>
                                    </tr>
                                    <tr>
                                        <td>options</td>
                                        <td>array</td>
                                        <td>[]</td>
                                        <td>select 타입의 옵션 배열 ({"{ value, label }"})</td>
                                    </tr>
                                    <tr>
                                        <td>rows</td>
                                        <td>number</td>
                                        <td>5</td>
                                        <td>textarea의 행 수</td>
                                    </tr>
                                    <tr>
                                        <td>accept</td>
                                        <td>string</td>
                                        <td>''</td>
                                        <td>file 타입의 허용 파일 형식</td>
                                    </tr>
                                    <tr>
                                        <td>fileName</td>
                                        <td>string</td>
                                        <td>''</td>
                                        <td>file 타입에서 선택된 파일명 표시</td>
                                    </tr>
                                </tbody>
                            </PropsTable>

                            <SubTitle>코드 예시</SubTitle>
                            <CodeBlock>
{`import { useState } from 'react';
import FormField from '../Common/Form/FormField';

const [formData, setFormData] = useState({
    campaignTitle: '',
    categoryNo: '',
    campaignContent: '',
    thumbnailFile: null,
    startDate: '',
    endDate: ''
});
const [fileName, setFileName] = useState('');
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        setFileName(files[0].name);
    }
};

// JSX
<FormField
    label="제목"
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    error={errors.title}
    required
    placeholder="제목을 입력하세요"
/>

<FormField
    label="카테고리"
    type="select"
    name="category"
    value={formData.category}
    onChange={handleChange}
    error={errors.category}
    required
    options={[
        { value: '환경', label: '환경' },
        { value: '기술', label: '기술' }
    ]}
/>

<FormField
    label="내용"
    type="textarea"
    name="content"
    value={formData.content}
    onChange={handleChange}
    placeholder="내용을 입력하세요"
    rows={8}
/>

<FormField
    label="첨부파일"
    type="file"
    name="file"
    onChange={handleFileChange}
    accept="image/*"
    fileName={fileName}
/>

<FormField
    label="시작일"
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleChange}
    required
/>`}
                            </CodeBlock>
                        </ComponentSection>
                    </TabContent>

                    {/* Table Tab */}
                    <TabContent $active={activeTab === 'table'}>
                        <ComponentSection>
                            <SectionTitle>DataTable</SectionTitle>
                            <p>Simple DataTables 라이브러리를 사용한 테이블 컴포넌트입니다. 검색, 정렬 기능을 제공합니다.</p>

                            <SubTitle>사용 예시</SubTitle>
                            <DemoContainer>
                                
                                <DataTable
                                    title="캠페인 목록"
                                    columns={tableColumns}
                                    data={tableData}
                                    icon="fas fa-leaf"
                                    onRowClick={handleRowClick} // DataTable 행 클릭 핸들러 _ 페이지 이동
                                />

                                <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>
                                    💡 캠페인 행을 클릭해보세요! 캠페인 상세 페이지로 이동합니다.
                                </p>
                            </DemoContainer>

                            <SubTitle>Props</SubTitle>
                            <PropsTable>
                                <thead>
                                    <tr>
                                        <th>Props</th>
                                        <th>타입</th>
                                        <th>기본값</th>
                                        <th>설명</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>title</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>테이블 제목</td>
                                    </tr>
                                    <tr>
                                        <td>columns</td>
                                        <td>array</td>
                                        <td>-</td>
                                        <td>컬럼 정의 배열 ({"{ header, field, render }"})</td>
                                    </tr>
                                    <tr>
                                        <td>data</td>
                                        <td>array</td>
                                        <td>-</td>
                                        <td>표시할 데이터 배열</td>
                                    </tr>
                                    <tr>
                                        <td>icon</td>
                                        <td>string</td>
                                        <td>-</td>
                                        <td>제목 옆 아이콘 클래스</td>
                                    </tr>
                                    <tr>
                                        <td>onRowClick</td>
                                        <td>function</td>
                                        <td>null</td>
                                        <td>행 클릭 이벤트 핸들러 (rowData, rowIndex)</td>
                                    </tr>
                                </tbody>
                            </PropsTable>

                            <SubTitle>코드 예시</SubTitle>
                            <CodeBlock>
{`import DataTable from '../Common/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { 
    EditButton, 
    DeleteButton,
    CategoryBadge,
    StatusBadge
} from '../Common/DataTable/DataTable.styled';

const navigate = useNavigate();

const columns = [
    {
        header: 'ID',
        field: 'campaignNo'
    },
    {
        header: '캠페인명',
        field: 'campaignTitle',
        render: (value) => <strong>{value}</strong>
    },
    {
        header: '카테고리',
        field: 'categoryNo',
        render: (value) => (
            <CategoryBadge>{value}</CategoryBadge>
        )
    },
    {
        header: '상태',
        field: 'status',
        render: (value) => (
            <StatusBadge $status={value}>{value}</StatusBadge>
        )
    },
    {
        header: '관리',
        field: 'campaignNo',
        render: (value) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <EditButton onClick={() => handleEdit(value)}>
                    수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(value)}>
                    삭제
                </DeleteButton>
            </div>
        )
    }
];

const data = [
    { 
        campaignNo: 1, 
        campaignTitle: '친환경 캠페인',
        categoryNo: '환경',
        status: '진행중' 
    },
    { 
        campaignNo: 2, 
        campaignTitle: '탄소중립 실천',
        categoryNo: '기술',
        status: '종료' 
    }
];

// 행 클릭 시 상세 페이지로 이동
const handleRowClick = (rowData) => {
    navigate('/campaigns/detail/' + rowData.campaignNo);
};

// JSX
<DataTable
    title="캠페인 목록"
    columns={columns}
    data={data}
    icon="fas fa-leaf"
    onRowClick={handleRowClick}
/>`}
                            </CodeBlock>
                        </ComponentSection>
                    </TabContent>
                </GuideContainer>
            </PageContent>

            {/* 실제 컴포넌트들 */}
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
                variant={toast.variant}
            />

            <Alert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title={alertVariant === 'info' ? '정보' : alertVariant === 'warning' ? '경고' : '위험'}
                message={
                    alertVariant === 'info'
                        ? '이것은 정보성 알림입니다.'
                        : alertVariant === 'warning'
                        ? '주의가 필요한 사항입니다.'
                        : '위험한 작업입니다. 신중히 진행하세요.'
                }
                variant={alertVariant}
            />

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
                title={confirmVariant === 'info' ? '확인' : confirmVariant === 'warning' ? '경고' : '삭제 확인'}
                message={
                    confirmVariant === 'info'
                        ? '계속 진행하시겠습니까?'
                        : confirmVariant === 'warning'
                        ? '이 작업은 주의가 필요합니다. 진행하시겠습니까?'
                        : '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
                }
                content={
                    <input type="text" placeholder="스타일은 개인 페이지에서 적용하시면 됩니다." />
                }
                confirmText={confirmVariant === 'danger' ? '삭제' : '확인'}
                cancelText="취소"
                variant={confirmVariant}
            />
        </>
    );
};

export default ComponentGuide;