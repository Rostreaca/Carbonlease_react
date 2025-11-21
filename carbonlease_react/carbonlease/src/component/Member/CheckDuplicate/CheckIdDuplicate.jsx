import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "../../Common/Alert/Alert";

const CheckIdDuplicate = (props) => {


    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const handleCheckId = () => {

    axios.post("http://localhost/members/checkId",
        {
                memberId: props.memberId
        }).then(result => {
                setCheckAlertVariant('info');
                setCheckAlertMsg("중복된 아이디가 없습니다.");
                setShowCheckAlert(true);
                props.setCheckId(true);
                props.setIdMsg('사용가능한 아이디입니다.');
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
                    title= '아이디 중복 확인'
                    message= {checkAlertMsg}
                    variant={checkAlertVariant}
        />
    </>)

}

export default CheckIdDuplicate;