import { useState } from 'react';

export const useFileWithPreview = (initialName = '', initialUrl = '') => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(initialName);
  const [preview, setPreview] = useState(initialUrl);

  const onFileChange = (e) => {
    const { files } = e.target;
    if (!files || !files[0]) return;

    const f = files[0];
    setFile(f);
    setFileName(f.name);

    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const setInitialFile = (name, url) => {
    if (name) setFileName(name);
    if (url) setPreview(url);
  };

  return {
    file,
    fileName,
    preview,
    onFileChange,
    setInitialFile,
  };
};
