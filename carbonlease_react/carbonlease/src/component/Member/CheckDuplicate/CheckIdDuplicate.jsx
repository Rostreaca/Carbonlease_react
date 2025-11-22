import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "../../Common/Alert/Alert";
import { AuthContext } from "../../Context/AuthContext";

const CheckIdDuplicate = (props) => {


    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const { auth } = useContext(AuthContext);

    const successMsg = () => {
        setCheckAlertVariant('info');
        setCheckAlertMsg("중복된 아이디가 없습니다.");
        setShowCheckAlert(true);
        props.setCheckId(true);
        props.setIdMsg('사용가능한 아이디입니다.');
    }

    const handleCheckId = () => {

        if (auth.memberId === props.memberId) {
            successMsg();
            return;
            // 삼항연산자로는 return이 안됨
        }

        axios.post("http://localhost/members/checkId",
            {
                memberId: props.memberId
            }).then(result => {
                successMsg();
            }).catch(error => {
                console.error(error);
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
                props.setCheckId(false);
            })
    }


    return (<>
        <Button type='button' onClick={handleCheckId}>중복확인</Button>

        <Alert
            show={showCheckAlert}
            onClose={() => { setShowCheckAlert(false) }}
            title='아이디 중복 확인'
            message={checkAlertMsg}
            variant={checkAlertVariant}
        />
    </>)

}

export default CheckIdDuplicate;