import React, { useEffect, useState, useRef } from 'react';
import '../../../node_modules/pdfjs-dist/web/pdf_viewer.css';
import Store from '../../store/reducers';
import { setUserId } from "../../store/userSlice";
import { setFiles, setFilesMap } from "../../store/filesSlice";
import { updateFiles } from '../../backend/update';
import { useDispatch } from 'react-redux';
import { DocName, EditorContainer, PageContainer, PageNumber, ToolBar } from './fileEditor.styles';
import { LeftContainer, RightContainer } from '../navbar/signInNav/navigation.styles';
import { faDownload, faPrint, faShare } from '@fortawesome/free-solid-svg-icons';
import { MiscContainer, MiscIcon } from '../drive-listings/drive-listings.styles';
import { text } from '@fortawesome/fontawesome-svg-core';

const pdfJS = require('pdfjs-dist/legacy/build/pdf');
pdfJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJS.version}/pdf.worker.js`;

const FileEditor = ({ fileId }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const canvasRefs = useRef([]);
  const dispatch = useDispatch();
  const [currFile, setCurrFile] = useState('');
  const [docName, setDocName] = useState('');
  const [addingTextBox, setAddingTextBox] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] = useState(null);
  const [selectedTextBoxInput, setSelectedTextBoxInput] = useState('');

// Update the selected text box input when the input changes
const handleTextBoxInputChange = (event) => {
  setSelectedTextBoxInput(event.target.value);
};

  const toggleAddTextBoxMode = () => {
    setAddingTextBox(!addingTextBox);
  };

  const handleCanvasDblClick = (event, pageIndex) => {
    event.preventDefault();
    const canvasRect = event.target.getBoundingClientRect();
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    const clickedTextBox = textBoxes.find(
      (textBox, index) =>
        textBox.pageIndex === pageIndex &&
        Math.abs(textBox.x - clickX) < 25 && // Adjust the tolerance as needed
        Math.abs(textBox.y - clickY) < 10 // Adjust the tolerance as needed
    );
    if (clickedTextBox) {
      setSelectedTextBoxIndex(textBoxes.indexOf(clickedTextBox));
      setSelectedTextBoxInput(clickedTextBox.text);
    }
    console.log(textBoxes)
  }

  const handleCanvasClick = (event, pageIndex) => {
    event.preventDefault();
    const canvasRect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - canvasRect.left;
    const offsetY = event.clientY - canvasRect.top;
    if (addingTextBox) {
      addTextBox(pageIndex, offsetX, offsetY);
    }
  };

  const addTextBox = (pageIndex, Xval, Yval) => {
    
    const newTextBox = {
      pageIndex: pageIndex,
      x: Xval,
      y: Yval,
      text: 'NewTextBox',
    };
    setTextBoxes([...textBoxes, newTextBox]);
    setSelectedTextBoxIndex(textBoxes.length);
    setSelectedTextBoxInput(newTextBox.text);
    setAddingTextBox(false);
    
  }

  const handleDocNameChange = (event) => {
    event.preventDefault();
    setDocName(event.target.value);
  };

  const updateUserData = async () => {
    try {
      console.log(localStorage.getItem('uid'));
      await dispatch(setUserId(localStorage.getItem('uid')));
      const files = await updateFiles(localStorage.getItem('uid'));
      console.log(files.data.files);
      await dispatch(setFiles(files.data.files));
      await dispatch(setFilesMap(files.data.files));
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmEdit = () => {
    if (selectedTextBoxIndex !== null) {
      const updatedTextBoxes = textBoxes.map((textBox, index) => {
        if (index === selectedTextBoxIndex) {
          return {
            ...textBox,
            text: selectedTextBoxInput,
          };
        }
        return textBox;
      }).filter(textBox => textBox.text !== '');
  
      setTextBoxes(updatedTextBoxes);
      setSelectedTextBoxIndex(null);
      setSelectedTextBoxInput('');
    }
  };
  
  

  useEffect(() => {
    async function loadPdf() {
      if (!fileId || !Store.getState().files.fileObjsMap[fileId]) {
        await updateUserData();
      }
      console.log(fileId);
      console.log(Store.getState().files.fileObjsMap);
      setCurrFile(Store.getState().files.fileObjsMap[fileId]);
      setDocName(Store.getState().files.fileObjsMap[fileId].fileName);
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
  }, [fileId])

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.key === 'Enter' && selectedTextBoxIndex !== null) {
        handleConfirmEdit();
      }
    };
  
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedTextBoxIndex]);

  useEffect(() => {
    if (!pdfDoc || !canvasRefs.current.length) {
      return;
    }
  
    const renderNextCanvas = async (pageIndex) => {
      if (pageIndex >= canvasRefs.current.length) {
        return; // All canvases are rendered
      }
  
      const canvas = canvasRefs.current[pageIndex];
      const pdfPage = await pdfDoc.getPage(pageIndex + 1);
  
      const context = canvas.getContext('2d');
  
      // Set canvas dimensions
      const viewport = pdfPage.getViewport({ scale: 1 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
  
      // Calculate the viewport dimensions
  
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw the PDF content
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      await pdfPage.render(renderContext).promise;
  
      // Draw the text boxes
      context.font = '12px Arial';
      context.fillStyle = 'black';
      const inputWidth = context.measureText(selectedTextBoxInput).width + 5;
      textBoxes.forEach((textBox) => {
        if (textBox.pageIndex === pageIndex) {
          context.fillStyle = 'black';
          context.fillText(textBox.text, textBox.x, textBox.y);

          if (selectedTextBoxIndex === textBoxes.indexOf(textBox)) {
            context.fillStyle = 'white';
            context.fillRect(
              textBox.x,
              textBox.y - 12,
              inputWidth,
              20
            ); // Use inputWidth here
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.strokeRect(
              textBox.x,
              textBox.y - 12,
              inputWidth,
              20
            );
          }
        }
      });
  
      // Render the next canvas
      renderNextCanvas(pageIndex + 1);
    };
  
    renderNextCanvas(0); // Start rendering from the first canvas
  }, [pdfDoc, textBoxes, selectedTextBoxIndex, selectedTextBoxInput]);


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
          <button onClick={toggleAddTextBoxMode}>
            {addingTextBox ? 'Cancel' : 'Add Text Box'}
          </button>
        </RightContainer>
        <MiscContainer>
          <MiscIcon icon={faDownload} />
          <MiscIcon icon={faPrint} />
          <MiscIcon icon={faShare} />
        </MiscContainer>
      </ToolBar>
      <EditorContainer>
        <div>
          {Array.from({ length: pdfDoc.numPages }).map((_, pageIndex) => (
            <PageContainer key={pageIndex}>
              <canvas
                ref={(canvas) => {
                  canvasRefs.current[pageIndex] = canvas; // Store canvas ref in the array
                }}
                onClick={(event) => handleCanvasClick(event, pageIndex)}
                onDoubleClick={(event) => handleCanvasDblClick(event, pageIndex)}
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
      {selectedTextBoxIndex !== null && (
        <input
          type="text"
          value={selectedTextBoxInput}
          onChange={handleTextBoxInputChange}
          onBlur={handleConfirmEdit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleConfirmEdit();
            }
          }}
          style={{
            position: 'absolute',
            left:
              canvasRefs.current[textBoxes[selectedTextBoxIndex]?.pageIndex]?.offsetLeft +
              textBoxes[selectedTextBoxIndex]?.x,
            top:
              canvasRefs.current[textBoxes[selectedTextBoxIndex]?.pageIndex]?.offsetTop +
              textBoxes[selectedTextBoxIndex]?.y -
              12,
            zIndex: 9,
          }}
        />
      )}
    </div>
  );
};

export default FileEditor;
