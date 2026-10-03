import React, { useState, useRef } from 'react';
import { 
  Bug, 
  UploadCloud, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  FileText,
  RotateCcw,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { detectCropDisease } from '../../services/diseaseDetectionService';
import { DiseaseDetectionResult } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

const SAMPLE_BLIGHT_URL = '/src/assets/images/crop_leaf_blight_1791035117330.jpg';
const SAMPLE_HEALTHY_URL = '/src/assets/images/crop_leaf_healthy_1791035131098.jpg';

export const DiseaseDetectionView: React.FC = () => {
  const { showToast, t } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string>(SAMPLE_BLIGHT_URL);
  const [selectedFileName, setSelectedFileName] = useState<string>('tomato_early_blight_sample.jpg');
  const [isDragOver, setIsDragOver] = useState(false);
  const [cropHint, setCropHint] = useState<string>('Tomato');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDetectionResult | null>(null);

  const handleFileSelect = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      showToast(t('common.error') + ': PNG, JPG, JPEG', 'warning');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast(t('common.error') + ': Max 15MB', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      setSelectedFileName(file.name);
      setDiagnosis(null);
      showToast(t('diseaseDetection.uploadTitle'), 'info');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!previewUrl) {
      showToast(t('diseaseDetection.uploadTitle'), 'warning');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await detectCropDisease({
        imageUrl: previewUrl,
        cropHint,
      });
      setDiagnosis(result);
      showToast(t('common.success'), 'success');
    } catch {
      showToast(t('common.error'), 'warning');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = (type: 'blight' | 'healthy') => {
    if (type === 'blight') {
      setPreviewUrl(SAMPLE_BLIGHT_URL);
      setSelectedFileName('tomato_early_blight_sample.jpg');
      setCropHint('Tomato');
      setDiagnosis(null);
    } else {
      setPreviewUrl(SAMPLE_HEALTHY_URL);
      setSelectedFileName('soybean_healthy_sample.jpg');
      setCropHint('Soybean');
      setDiagnosis(null);
    }
    showToast(t('common.success'), 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Bug className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('diseaseDetection.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('diseaseDetection.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Upload and Sample Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Uploader & Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {t('diseaseDetection.uploadTitle')}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadSample('blight')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  {t('diseaseDetection.sampleBlight')}
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('healthy')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {t('diseaseDetection.sampleHealthy')}
                </button>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/60 dark:bg-neutral-800/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    {t('diseaseDetection.dragDrop')}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {t('diseaseDetection.fileTypes')}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Box */}
            {previewUrl && (
              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
                    {selectedFileName}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-mono">
                    {t('common.prototypeTag')}
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950 h-56 sm:h-64 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Leaf specimen"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500">{t('diseaseDetection.cropLabel')}</span>
                <select
                  value={cropHint}
                  onChange={(e) => setCropHint(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="Tomato">{t('crops.Tomato')}</option>
                  <option value="Soybean">{t('crops.Soybean')}</option>
                  <option value="Cotton">{t('crops.Cotton')}</option>
                  <option value="Wheat">{t('crops.Wheat')}</option>
                  <option value="Onion">{t('crops.Onion')}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !previewUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? t('diseaseDetection.analyzing') : t('diseaseDetection.analyzeBtn')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Output or Instructions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {diagnosis ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block">
                    {t('diseaseDetection.diseaseLabel')}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {diagnosis.disease}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">
                    {t('diseaseDetection.severityLabel')} {diagnosis.severity}
                  </span>
                  <span className="block text-[10px] text-neutral-400 mt-1">
                    {t('diseaseDetection.confidenceLabel')} {diagnosis.confidenceLabel}
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                  {t('diseaseDetection.symptomsTitle')}:
                </h4>
                <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc list-inside">
                  {diagnosis.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Possible causes */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                  {t('diseaseDetection.causesTitle')}:
                </h4>
                <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc list-inside">
                  {diagnosis.possibleCauses.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended management */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                  {t('diseaseDetection.managementTitle')}:
                </h4>
                <ul className="text-xs text-emerald-800 dark:text-emerald-300/90 space-y-1.5 list-disc list-inside leading-relaxed">
                  {diagnosis.recommendedManagement.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                  {t('diseaseDetection.preventionTitle')}:
                </h4>
                <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc list-inside">
                  {diagnosis.prevention.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Safe Agronomic Disclaimer */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                <span className="font-semibold block mb-0.5">{t('diseaseDetection.safetyWarningTitle')}:</span>
                {t('diseaseDetection.safetyWarningDesc')}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {t('diseaseDetection.diagnosisTitle')}
              </h3>
              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <p>
                    Capture the leaf in bright natural diffuse daylight. Avoid direct flash reflections or heavy shadows.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <p>
                    Frame the lesion or spots clearly in the center of the viewport (at least 60% of frame area).
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <p>
                    Use the <strong>{t('diseaseDetection.sampleBlight')}</strong> or <strong>{t('diseaseDetection.sampleHealthy')}</strong> buttons for instant testing.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>{t('common.simulatedInference')}</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  {t('common.liveRoadmap')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
