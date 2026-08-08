import React, { useState, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { predictDisease } from '../services/diseaseService';

export default function DiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClearImage = (e) => {
    e?.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await predictDisease(selectedFile);
      setResult(data);
    } catch (err) {
      console.error('Disease prediction error:', err);
      setError(err.message || 'Failed to analyze crop image. Please check your backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex font-sans antialiased">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-[260px] relative flex flex-col min-h-screen bg-bg-warm">
        <TopNavBar />

        {/* Canvas Content */}
        <div className="mt-16 p-margin-mobile lg:p-margin-desktop flex-1 max-w-max-width mx-auto w-full">
          <div className="mb-8">
            <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary">
              AI Disease Detection
            </h2>
            <p className="font-body-lg text-body-lg text-text-muted mt-2">
              Upload a clear image of the affected crop leaf for instant AI analysis and treatment recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
            {/* Upload Section (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !selectedFile && fileInputRef.current?.click()}
                className={`flex-1 min-h-[340px] bg-surface-container-low border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center relative group overflow-hidden transition-all ${
                  selectedFile ? 'border-primary' : 'border-primary-fixed-dim hover:bg-primary-fixed/10 cursor-pointer'
                }`}
              >
                {!selectedFile ? (
                  /* Empty State */
                  <div className="flex flex-col items-center gap-4 pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined !text-[40px]">add_photo_alternate</span>
                    </div>
                    <h3 className="font-title-lg text-title-lg font-semibold text-primary">
                      Drag & drop crop image
                    </h3>
                    <p className="font-body-md text-body-md text-text-muted max-w-xs">
                      or click to browse. Supports JPG, PNG up to 10MB. Ensure affected area is visible.
                    </p>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="mt-4 px-6 py-2.5 bg-white border border-border-subtle rounded-full text-primary font-label-md hover:bg-surface-container-highest transition-colors shadow-sm pointer-events-auto"
                    >
                      Browse Files
                    </button>
                  </div>
                ) : (
                  /* Preview State */
                  <div className="absolute inset-0 w-full h-full bg-surface p-4 flex flex-col items-center justify-center">
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border-subtle shadow-sm group/preview">
                      <img 
                        src={previewUrl} 
                        alt="Selected Leaf" 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-danger-muted shadow-md hover:bg-danger-muted hover:text-white transition-colors"
                        title="Remove image"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>

                      {/* Scanning Overlay Animation */}
                      {isLoading && (
                        <div className="absolute inset-0 bg-primary/20 pointer-events-none">
                          <div className="w-full h-1 bg-secondary-fixed shadow-[0_0_10px_#a1f4c8] animate-[scan_2s_ease-in-out_infinite]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-4 bg-error-container/30 border border-error/20 text-error rounded-xl text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Analyze Action Button */}
              <button 
                onClick={handleAnalyze}
                disabled={!selectedFile || isLoading}
                className="w-full py-4 bg-primary text-white rounded-xl font-title-md text-title-md font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Analyzing Crop Image...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">document_scanner</span>
                    Analyze Crop Image
                  </>
                )}
              </button>
            </div>

            {/* Result Panel (Right) */}
            <div className="lg:col-span-7 flex flex-col">
              {!result && !isLoading && (
                /* Pre-analysis Empty State */
                <div className="flex-1 bg-white rounded-xl border border-border-subtle flex items-center justify-center p-8 shadow-sm min-h-[340px]">
                  <div className="text-center flex flex-col items-center gap-4 max-w-sm">
                    <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center text-surface-tint opacity-50">
                      <span className="material-symbols-outlined !text-[48px]">psychology</span>
                    </div>
                    <h3 className="font-title-lg text-title-lg font-semibold text-text-muted">Awaiting Analysis</h3>
                    <p className="font-body-md text-body-md text-text-muted">
                      Upload a crop leaf photo and click analyze to receive AI-powered diagnosis, observations, and treatment plans.
                    </p>
                  </div>
                </div>
              )}

              {isLoading && (
                /* Loading State Card */
                <div className="flex-1 bg-white rounded-xl border border-border-subtle flex flex-col items-center justify-center p-8 shadow-sm min-h-[340px] space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary animate-bounce">
                    <span className="material-symbols-outlined text-3xl">local_florist</span>
                  </div>
                  <h3 className="font-title-lg text-title-lg font-bold text-primary">Gemini AI is analyzing your crop...</h3>
                  <p className="font-body-md text-body-md text-text-muted">Inspecting leaf symptoms, venation, and lesion patterns.</p>
                </div>
              )}

              {result && !isLoading && (
                /* Result Content */
                <div className="flex-1 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col">
                  {/* Header Badge */}
                  <div className="bg-danger-muted/10 border-b border-danger-muted/20 p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-3 py-1 bg-danger-muted text-white rounded-full font-label-md text-label-md flex items-center gap-1">
                          <span className="material-symbols-outlined !text-[14px]">warning</span> 
                          {result.disease === 'Healthy' ? 'Healthy Crop' : 'Diagnosis Complete'}
                        </span>
                        {result.confidence && (
                          <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md font-bold">
                            Confidence: {result.confidence}
                          </span>
                        )}
                      </div>
                      <h3 className="font-headline-lg text-2xl font-bold text-text-charcoal mt-2">
                        {result.disease || 'Detected Condition'}
                      </h3>
                      <p className="font-title-md text-title-md text-text-muted">
                        Crop: <strong className="text-primary">{result.crop || 'Unknown Crop'}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* Observations */}
                    {result.observations && (
                      <div>
                        <h4 className="font-title-md text-title-md font-bold text-primary mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-surface-tint">visibility</span> 
                          AI Observations
                        </h4>
                        <div className="p-4 bg-surface-container-low rounded-lg border border-border-subtle text-body-md text-on-surface-variant leading-relaxed">
                          {result.observations}
                        </div>
                      </div>
                    )}

                    {/* Treatment Advisory */}
                    <div>
                      <h4 className="font-title-md text-title-md font-bold text-primary mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-surface-tint">medical_services</span> 
                        Recommended Advisory & Treatment Plan
                      </h4>
                      <div className="p-4 bg-surface p-4 rounded-lg border border-border-subtle whitespace-pre-line text-body-md text-on-surface-variant leading-relaxed">
                        {result.advice || 'No specific advisory returned.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
