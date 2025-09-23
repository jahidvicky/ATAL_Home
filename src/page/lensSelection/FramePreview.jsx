import React from "react";

const FramePreview = () => (
  <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 shadow-md">
    <img
      src="https://assets2.clearly.ca/cdn-record-files-pi/50cda3d2-12b3-45e9-9771-b187012abf63/d4c00fb8-9167-43dc-b1a9-b1e700936565/0QY4014__400101__TOP__shad__qt.png"
      alt="Sunglasses"
      className="w-72 h-auto"
    />
    <div className="mt-4 text-sm text-gray-600">Clearly SUNLIGHT</div>
    <div className="text-xs text-gray-400">Frame size: S</div>
  </div>
);

export default FramePreview;
