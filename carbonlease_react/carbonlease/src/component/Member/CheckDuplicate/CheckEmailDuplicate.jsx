import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "../../Common/Alert/Alert";

const CheckEmailDuplicate = (props) => {

    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const handleCheckEmail = (e) => {
    
    axios.post("http://localhost/members/checkEmail",
        {
                email: props.email
        }).then(result => {
                setCheckAlertVariant('info');
                setCheckAlertMsg("중복된 이메일이 없습니다.");
                setShowCheckAlert(true);
                props.setCheckEmail(true);
                props.setEmailMsg('사용가능한 이메일입니다.');
            }).catch(error => {
                console.error(error);
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
                props.setCheckEmail(false);
            })
    }


    return (<>
        <Button type='button' onClick={handleCheckEmail}>중복확인</Button>

        <Alert
                    show={showCheckAlert}
                    onClose={() => { setShowCheckAlert(false) }}
                    title= '이메일 중복 확인'
                    message= {checkAlertMsg}
                    variant={checkAlertVariant}
        />
    </>)

}

export default CheckEmailDuplicate;