import { useEffect, useState } from "react";
import { fetchActivityDetail } from "../../../../api/activity/activityAPI";

export default function useUpdateFormState(id) {

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
    }, [id]);

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
