// @ts-nocheck
import React, { useState } from "react";
import "./fullscreen-manager.css";

const FullscreenManager: React.FC = () => {
  const [isFullscreen, toggleFullScreenMode] = useState(false);

  const toggleFullScreen = () => {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    var cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  };

  const handleFullscreenClick = () => {
    toggleFullScreen();
    toggleFullScreenMode((prev) => !prev);
  };

  return (
    <button className="btn-fullscreen" onClick={handleFullscreenClick}>
      {isFullscreen ? "Cancel fullscreen" : "Go fullscreen"}
    </button>
  );
};

export default FullscreenManager;
