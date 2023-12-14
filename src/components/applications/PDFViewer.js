/*
import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import WindowBar from '../WindowBar';
import { useSelector } from 'react-redux';
 
const MyPdfViewer = ( props ) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const app = useSelector(state => state.apps.pdfViewer);

 
  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><i className="fa fa-arrow-left"></i> Previous</li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><i className="fa fa-arrow-left"></i> Previous</li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}>Next <i className="fa fa-arrow-right"></i></li>;
    if (page === pages) {
      nextButton = <li className="next disabled">Next <i className="fa fa-arrow-right"></i></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }
 
  const canvasEl = useRef(null);
 
  const [loading, numPages] = usePdf({
    file: app.src,//'test.pdf',
    //onDocumentComplete,
    scale : 2,
    page,
    canvasEl
  });
 
  useEffect(() => {
    setPages(numPages);
  }, [numPages]);
 
  return (
    <WindowBar app={app}>
    <div>
      {loading && <span>Loading...</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
    </WindowBar>
  );
}
 
export default MyPdfViewer;
*/