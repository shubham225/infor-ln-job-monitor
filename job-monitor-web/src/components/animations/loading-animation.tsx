import React from "react";

type Props = {};

export default function LoadingAnimation({}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="overlay" id="overlay"></div>
      <div className="loader">
        <div className="loader-cube">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
      </div>
    </div>
  );
}
