import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActivityDetail } from "../../../../api/activity/activityAPI";

export default function useUpdateFormState(id) {

    const navigate = useNavigate();

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
        if (!token) {
            alert("로그인 후 이용해주세요!");
            navigate("/login");
            return;
        }

        fetchActivityDetail(id)
            .then(res => {
                console.log("activity detail data:", res.data);
                const d = res.data;

                setTitle(d.activityTitle);
                setContent(d.activityContent);
                setAddress(d.address);
                setLat(d.lat);
                setLng(d.lng);
                setRegionNo(String(d.regionNo ?? ""));
                setCategory(String(d.certificationNo ?? ""));

                const base = import.meta.env.VITE_API_BASE_URL;

                if (d.images && d.images.length > 0) {
                    setOriginImage(`${base}${d.images[0]}`);
                } else {
                    setOriginImage(null);
                }
            })
            .catch(err => console.error(err));
    }, [navigate, id]);

    return {
        activityNo: id,
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
