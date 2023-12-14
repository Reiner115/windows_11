import React from "react";


export default function Loading() {
  return (
    <section className="loading-screen">

    
      <div className="loading-container">
          
        <div className="loading">
            <div className="dot"></div>
        </div>
        <div className="loading">
            <div className="dot"></div>
        </div>
        <div className="loading">
            <div className="dot"></div>
        </div>
        <div className="loading">
            <div className="dot"></div>
        </div>
      </div>
      <div className="loading-text">Loading</div>
    </section>
  );
}
