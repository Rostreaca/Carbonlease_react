import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActivityDetail } from "../../../../api/activity/activityAPI";


export default function useUpdateFormState() {

    const navigate = useNavigate();
    const { activityNo } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [regionNo, setRegionNo] = useState("");
    const [category, setCategory] = useState("");

    const [file, setFile] = useState(null);
    const [originImage, setOriginImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(!token) {
            alert("로그인 후 이용해주세요!");
            navigate("/login");
            return;
        }

        fetchActivityDetail(activityNo)
            .then(res => {
                const d = res.data;
                setTitle(d.activityTitle);
                setContent(d.activityContent);
                setAddress(d.address);
                setLat(d.lat);
                setLng(d.lng);
                setRegionNo(d.regionNo);
                setCategory(d.certificationNo);
                setOriginImage(d.thumbnailPath);
            })
            .catch(err => console.error(err));
    }, [navigate, activityNo]);

    return {
        activityNo,
        title, setTitle,
        content, setContent,
        address, setAddress,
        lat, setLat,
        lng, setLng,
        regionNo, setRegionNo,
        category, setCategory,
        file, setFile,
        originImage
    };
}