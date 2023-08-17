import React from 'react';
import { Route, useParams } from 'react-router-dom';
import FileEditor from './fileEditor.component'; // Import your FileEditor component

const FileEditorWrapper = () => {
    const { '*': filePath } = useParams();

  
    return (
      <>
        <FileEditor fileId={filePath} />
      </>
    );
  }

export default FileEditorWrapper
  