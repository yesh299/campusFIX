import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

const ImageUploader = ({ onFileSelect, previewUrl, onClear }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setError('');
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, JPEG, and PNG image files are supported.');
      return;
    }

    // Validate size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5 MB maximum limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        Attach Photo Evidence (Optional)
      </label>

      {previewUrl ? (
        <div className="relative rounded-xl border border-slate-200 p-2 bg-slate-50 flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
            <img
              src={previewUrl}
              alt="Evidence Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">Attached Image</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Ready for upload (Max 5 MB)</p>
            <button
              type="button"
              onClick={onClear}
              className="mt-2 text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-[#3155E7] bg-blue-50/50'
              : 'border-slate-300 hover:border-[#3155E7] bg-slate-50 hover:bg-slate-50/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#3155E7] flex items-center justify-center mx-auto mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-700">
            Click to upload or drag & drop photo
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            PNG, JPG, or JPEG up to 5 MB
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-rose-600 text-xs mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
