import React from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, XCircle, Clock } from 'lucide-react';

interface FormSectionProps {
  title: string;
  features: string[];
  results: { [key: string]: { status: 'Pass' | 'Fail' | 'Not Tested' } };
  onResultChange: (feature: string, status: 'Pass' | 'Fail' | 'Not Tested') => void;
  uiuxRating: number;
  onUIUXRatingChange: (rating: number) => void;
  comments?: string;
  onCommentsChange?: (comments: string) => void;
  screenshots: File[];
  onScreenshotsChange: (files: File[]) => void;
  showComments?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  features,
  results,
  onResultChange,
  uiuxRating,
  onUIUXRatingChange,
  comments = '',
  onCommentsChange,
  screenshots,
  onScreenshotsChange,
  showComments = true
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles) => {
      onScreenshotsChange([...screenshots, ...acceptedFiles]);
    }
  });

  const removeScreenshot = (index: number) => {
    const newScreenshots = screenshots.filter((_, i) => i !== index);
    onScreenshotsChange(newScreenshots);
  };

  const getStatusIcon = (status: 'Pass' | 'Fail' | 'Not Tested') => {
    switch (status) {
      case 'Pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'Not Tested':
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: 'Pass' | 'Fail' | 'Not Tested', isSelected: boolean) => {
    if (!isSelected) return 'bg-white/10 text-white/70 border-white/20';
    switch (status) {
      case 'Pass':
        return 'bg-green-500 text-white border-green-500';
      case 'Fail':
        return 'bg-red-500 text-white border-red-500';
      case 'Not Tested':
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-8 space-y-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      {/* Features Testing Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Feature Testing</h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-white/5 rounded-lg"
            >
              <div className="md:col-span-1">
                <span className="text-white font-medium">{feature}</span>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2">
                {(['Pass', 'Fail', 'Not Tested'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => onResultChange(feature, status)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                      getStatusColor(status, results[feature]?.status === status)
                    }`}
                  >
                    {getStatusIcon(status)}
                    <span className="text-sm font-medium">{status}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* UI/UX Rating */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">UI/UX Rating (0-100)</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm w-8">0</span>
            <input
              type="range"
              min="0"
              max="100"
              value={uiuxRating}
              onChange={(e) => onUIUXRatingChange(Number(e.target.value))}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white text-sm w-8">100</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-white">{uiuxRating}</span>
            <div className="text-sm text-white/70">
              {uiuxRating >= 80 ? 'Excellent' : 
               uiuxRating >= 60 ? 'Good' : 
               uiuxRating >= 40 ? 'Fair' : 
               uiuxRating >= 20 ? 'Poor' : 'Very Poor'}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
          <textarea
            value={comments}
            onChange={(e) => onCommentsChange?.(e.target.value)}
            placeholder="Add any additional comments about this section..."
            rows={4}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 form-input focus:outline-none"
          />
        </div>
      )}

      {/* Screenshot Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Screenshots</h3>
        
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-400 bg-blue-400/10' 
              : 'border-white/30 hover:border-white/50 hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <p className="text-white mb-2">
            {isDragActive ? 'Drop the files here...' : 'Drag & drop screenshots here, or click to select'}
          </p>
          <p className="text-white/60 text-sm">PNG, JPG, JPEG, GIF up to 10MB</p>
        </div>

        {/* Uploaded Screenshots */}
        {screenshots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {screenshots.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="w-full h-20 bg-white/20 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FormSection;