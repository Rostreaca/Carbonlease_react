import axios from "axios";
import Alert from "../../Common/Alert/Alert";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const CheckNickNameDuplicate = (props) => {

    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const { auth } = useContext(AuthContext);

    const successMsg = () => {
        setCheckAlertVariant('info');
        setCheckAlertMsg("중복된 닉네임이 없습니다.");
        setShowCheckAlert(true);
        props.setCheckNickName(true);
        props.setNickNameMsg("사용 가능한 닉네임입니다.")
    }

    const handleCheckNickName = () => {

        if (auth.nickName === props.nickName) {
            successMsg();
            return;
            // 삼항연산자로는 return이 안됨
        }

        axios.post("http://localhost/members/checkNickName",
            {
                nickName: props.nickName
            }).then(result => {
                successMsg();
            }).catch(error => {
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
                props.setCheckNickName(false);
            })

    }

    return (<>
        <Button type='button' onClick={handleCheckNickName}>중복확인</Button>
        <Alert
            show={showCheckAlert}
            onClose={() => { setShowCheckAlert(false) }}
            title='닉네임 중복 확인'
            message={checkAlertMsg}
            variant={checkAlertVariant}
        />
    </>)

}

export default CheckNickNameDuplicate;