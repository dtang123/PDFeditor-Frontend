import React, { useEffect, useState, useRef } from 'react';
import '../../../node_modules/pdfjs-dist/web/pdf_viewer.css'; // Import the CSS for PDF viewer
import Store from '../../store/reducers';
import { setUserId } from "../../store/userSlice"
import { setFiles, setFilesMap } from "../../store/filesSlice"

import { updateFiles } from '../../backend/update';
import { useDispatch } from 'react-redux';
import { DocName, EditorContainer, PageContainer, PageNumber, ToolBar } from './fileEditor.styles';
import { LeftContainer, RightContainer } from '../navbar/signInNav/navigation.styles';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { MiscIcon } from '../drive-listings/drive-listings.styles';

const pdfJS = require('pdfjs-dist/legacy/build/pdf'); // Use the legacy build
pdfJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJS.version}/pdf.worker.js`;

const FileEditor = ({ fileId }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const canvasRefs = useRef([]);
  const dispatch = useDispatch();
  const [currFile, setCurrFile] = useState('')
  const [docName, setDocName] = useState('')

  const handleDocNameChange = (event) => {
    event.preventDefault()
    setDocName(event.target.value)
  }

  const updateUserData = async () => {
    try {
        console.log(localStorage.getItem('uid'))
        await dispatch(setUserId(localStorage.getItem('uid')))
        const files = await updateFiles(localStorage.getItem('uid'))
        console.log(files.data.files)
        await dispatch(setFiles(files.data.files))
        await dispatch(setFilesMap(files.data.files))
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    async function loadPdf() {
      if (!fileId || !Store.getState().files.fileObjsMap[fileId]) {
        await updateUserData()
      }
      console.log(fileId)
      console.log(Store.getState().files.fileObjsMap)
      setCurrFile(Store.getState().files.fileObjsMap[fileId])
      setDocName(currFile.fileName)
      const base64Data = Store.getState().files.fileObjsMap[fileId].file;
      const decodedData = atob(base64Data);
      const pdfBytes = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        pdfBytes[i] = decodedData.charCodeAt(i);
      }
      const dataBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(dataBlob);
      
      try {
        const loadingTask = pdfJS.getDocument({ url: dataUrl });
        const loadedPdfDoc = await loadingTask.promise;
        setPdfDoc(loadedPdfDoc);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    }
    if (fileId) {
      loadPdf();
    }
  }, [fileId]);

  const drawPage = async (pdfPage, canvas) => {
    console.log(canvas)
    console.log(pdfPage)
    const context = canvas.getContext('2d');
    const viewport = await pdfPage.getViewport({ scale: 1 }); // Get viewport asynchronously

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport,
    };
    await pdfPage.render(renderContext).promise;
  };

  useEffect(() => {
    if (!pdfDoc || !canvasRefs.current.length) {
      return;
    }

    canvasRefs.current.forEach(async (canvas, pageIndex) => {
      const pdfPage = await pdfDoc.getPage(pageIndex + 1);
      drawPage(pdfPage, canvas);
    });
  }, [pdfDoc]);

  if (!pdfDoc || !fileId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToolBar>
        <LeftContainer>
          <DocName value={docName} onChange={handleDocNameChange} />
        </LeftContainer>
        <RightContainer>
          <MiscIcon icon={faShare} />
        </RightContainer>
      </ToolBar>
      <EditorContainer>
        <div>
          {Array.from({ length: pdfDoc.numPages }).map((_, pageIndex) => (
            <PageContainer key={pageIndex}>
              <canvas
                ref={(canvas) => {
                  canvasRefs.current[pageIndex] = canvas; // Store canvas ref in the array
                }}
              />
              <PageNumber>
                <p>
                  Page {pageIndex + 1}/{pdfDoc.numPages}
                </p>
              </PageNumber>
            </PageContainer>
          ))}
        </div>
      </EditorContainer>
    </div>
  );
};

export default FileEditor;
