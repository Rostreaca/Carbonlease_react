import { useState } from "react";

export default function useInsertFormState() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [regionNo, setRegionNo] = useState("");
    const [category, setCategory] = useState("");

    const [file, setFile] = useState(null);

    const handleAddressChange = (addr, latValue, lngValue) => {
        setAddress(addr);
        setLat(latValue);
        setLng(lngValue);
    };

    const handleChangeFile = (file) => {
        setFile(file);
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        address,
        lat,
        lng,
        handleAddressChange,
        regionNo,
        setRegionNo,
        category,
        setCategory,
        file,
        handleChangeFile
    };
}