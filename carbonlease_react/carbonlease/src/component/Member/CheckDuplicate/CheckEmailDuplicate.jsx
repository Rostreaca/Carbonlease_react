import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "../../Common/Alert/Alert";
import { AuthContext } from "../../Context/AuthContext";

const CheckEmailDuplicate = (props) => {

    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const { auth } = useContext(AuthContext);

    const successMsg = () => {
            setCheckAlertVariant('info');
            setCheckAlertMsg("중복된 이메일이 없습니다.");
            setShowCheckAlert(true);
            props.setCheckEmail(true);
            props.setEmailMsg('사용가능한 이메일입니다.');
    }

    const handleCheckEmail = (e) => {


        if (auth.email === props.email) {
            successMsg();
            return; 
            // 삼항연산자로는 return이 안됨
        }

        axios.post("http://localhost/members/checkEmail",
            {
                email: props.email
            }).then(result => {
                successMsg();
            }).catch(error => {
                console.error(error);
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                props.setEmailMsg('사용할 수 없는 이메일입니다.');
                setShowCheckAlert(true);
                props.setCheckEmail(false);
            })
    }


    return (<>
        <Button type='button' onClick={handleCheckEmail}>중복확인</Button>

        <Alert
            show={showCheckAlert}
            onClose={() => { setShowCheckAlert(false) }}
            title='이메일 중복 확인'
            message={checkAlertMsg}
            variant={checkAlertVariant}
        />
    </>)

}

export default CheckEmailDuplicate;