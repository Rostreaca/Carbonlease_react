import axios from "axios";
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {

const [searchParams] = useSearchParams();
const code = searchParams.get("code");

const navi = useNavigate();

useEffect(() => {
    axios.post(`http://localhost/auth/kakaoLogin?code=${code}`
    ).then(result =>
         console.log(result)
    ).catch(err => 
        console.error(err)
    );

    navi('/');

}, []);

}

export default KakaoCallback;