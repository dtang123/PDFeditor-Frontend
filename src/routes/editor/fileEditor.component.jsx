import React, { useEffect, useState, useRef } from 'react';
import '../../../node_modules/pdfjs-dist/web/pdf_viewer.css'; // Import the CSS for PDF viewer
import Store from '../../store/reducers';

const pdfJS = require('pdfjs-dist/legacy/build/pdf'); // Use the legacy build
pdfJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJS.version}/pdf.worker.js`;

const FileEditor = ({ fileId }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const canvasRefs = useRef([]);
  
  useEffect(() => {
    async function loadPdf() {
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

    loadPdf();
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
      {Array.from({ length: pdfDoc.numPages }).map((_, pageIndex) => (
        <div key={pageIndex}>
          <canvas
            ref={(canvas) => {
              canvasRefs.current[pageIndex] = canvas; // Store canvas ref in the array
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FileEditor;
