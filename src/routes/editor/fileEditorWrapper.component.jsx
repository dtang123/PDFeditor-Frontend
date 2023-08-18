import React, { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import FileEditor from './fileEditor.component'; // Import your FileEditor component
import { useDispatch, useSelector } from 'react-redux';

import Store from "../../store/reducers"

const FileEditorWrapper = () => {
  const location = useLocation();
  const [filePath, setFilepath] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userId);
  const files = useSelector((state) => state.files)

  

  useEffect(() => {
    const path = location.pathname.replace('/edit/', ''); // Extract path from the URL
    
    setFilepath(path);
  }, [location.pathname, user]);

  return (
    <>
      <FileEditor fileId={filePath} />
    </>
  );
}

export default FileEditorWrapper;




