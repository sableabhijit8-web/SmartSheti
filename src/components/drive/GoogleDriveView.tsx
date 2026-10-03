import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  UploadCloud, 
  Search, 
  Trash2, 
  ExternalLink, 
  RotateCcw, 
  HardDrive, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  FileImage, 
  Plus, 
  Download,
  Info,
  Layers,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  listDriveFiles, 
  uploadFileToDrive, 
  deleteDriveFile, 
  getOrCreateFolder 
} from '../../services/googleDriveService';
import { DriveFileItem } from '../../types';
import { DEMO_MARKET_PRICES } from '../../data/mockData';
import { PrototypeBanner } from '../layout/PrototypeBanner';

export const GoogleDriveView: React.FC = () => {
  const { 
    driveUser, 
    isDriveConnected, 
    connectDrive, 
    disconnectDrive, 
    farmerProfile, 
    showToast 
  } = useApp();

  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);

  // Destructive Action Modal State (Mandatory for Workspace Integration)
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchFiles = async () => {
    if (!isDriveConnected) return;
    setIsLoading(true);
    try {
      const data = await listDriveFiles(searchQuery);
      setFiles(data);
    } catch (err: any) {
      console.error('Error fetching drive files:', err);
      showToast(err.message || 'Failed to list Google Drive files', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDriveConnected) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [isDriveConnected]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFiles();
  };

  // Export Complete Farm Decision Dossier into Google Drive
  const handleExportFarmDossier = async () => {
    if (!isDriveConnected) {
      const connected = await connectDrive();
      if (!connected) return;
    }

    setIsExporting(true);
    try {
      const folderId = await getOrCreateFolder('KrushiAI Farm Records');
      const dateStr = new Date().toISOString().split('T')[0];
      const fileName = `KrushiAI_Farm_Dossier_${farmerProfile.name.replace(/\s+/g, '_')}_${dateStr}.md`;

      const dossierContent = `# KRUSHIAI FARM INTELLIGENCE DOSSIER
Generated: ${new Date().toLocaleString('en-IN')}
Farmer: ${farmerProfile.name}
Location: ${farmerProfile.village}, ${farmerProfile.district}, ${farmerProfile.state}

## 1. Landholding & Agronomic Profile
- Total Holding: ${farmerProfile.farmArea} Hectares
- Primary Soil Classification: ${farmerProfile.soilType}
- Water / Irrigation Source: ${farmerProfile.irrigationType}
- Active Crop Rotation: ${farmerProfile.mainCrops.join(', ')}

## 2. Decision Support Summary
- Recommended Kharif Crop: Soybean (Suitability Score: 88/100)
- Optimal Sowing Window: June 20 - July 07 (After 75mm cumulative rainfall)
- Row Geometry: 45 cm row spacing x 5 cm plant spacing

## 3. Today's Regional APMC Market Snapshot (Demo Data)
${DEMO_MARKET_PRICES.map((p) => `- ${p.crop} at ${p.market}: ₹${p.modalPrice}/Quintal (Min: ₹${p.minPrice}, Max: ₹${p.maxPrice})`).join('\n')}

---
*Generated automatically by KrushiAI Decision Support System. Stored securely in Google Drive folder: KrushiAI Farm Records.*
`;

      const uploaded = await uploadFileToDrive(fileName, dossierContent, 'text/markdown', folderId);
      showToast(`Exported "${uploaded.name}" to Google Drive folder "KrushiAI Farm Records"`, 'success');
      await fetchFiles();
    } catch (err: any) {
      showToast(err.message || 'Failed to export dossier to Google Drive', 'warning');
    } finally {
      setIsExporting(false);
    }
  };

  // Export APMC Mandi Comparison Table as CSV to Drive
  const handleExportMandiCSV = async () => {
    if (!isDriveConnected) {
      const connected = await connectDrive();
      if (!connected) return;
    }

    setIsExporting(true);
    try {
      const folderId = await getOrCreateFolder('KrushiAI Farm Records');
      const dateStr = new Date().toISOString().split('T')[0];
      const fileName = `Maharashtra_APMC_Rates_${dateStr}.csv`;

      let csvContent = 'Crop,APMC Market,District,Min Price (INR/Qtl),Max Price (INR/Qtl),Modal Price (INR/Qtl),Last Updated\n';
      DEMO_MARKET_PRICES.forEach((r) => {
        csvContent += `"${r.crop}","${r.market}","${r.district}",${r.minPrice},${r.maxPrice},${r.modalPrice},"${r.lastUpdated}"\n`;
      });

      const uploaded = await uploadFileToDrive(fileName, csvContent, 'text/csv', folderId);
      showToast(`Saved "${uploaded.name}" spreadsheet to Google Drive!`, 'success');
      await fetchFiles();
    } catch (err: any) {
      showToast(err.message || 'Failed to save spreadsheet to Drive', 'warning');
    } finally {
      setIsExporting(false);
    }
  };

  // Upload Custom File (Soil Health Card, Receipt, Leaf Photo)
  const handleUploadCustomFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUploadFile) {
      showToast('Please select a file to upload', 'warning');
      return;
    }

    setIsExporting(true);
    try {
      const folderId = await getOrCreateFolder('KrushiAI Farm Records');
      const name = uploadFileName.trim() || selectedUploadFile.name;
      const uploaded = await uploadFileToDrive(
        name,
        selectedUploadFile,
        selectedUploadFile.type || 'application/octet-stream',
        folderId
      );
      showToast(`Uploaded "${uploaded.name}" to Google Drive!`, 'success');
      setSelectedUploadFile(null);
      setUploadFileName('');
      await fetchFiles();
    } catch (err: any) {
      showToast(err.message || 'File upload to Drive failed', 'warning');
    } finally {
      setIsExporting(false);
    }
  };

  // Execute Destructive Delete Action with user confirmation
  const executeDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      showToast(`Permanently deleted "${fileToDelete.name}" from Google Drive.`, 'info');
      setFileToDelete(null);
      await fetchFiles();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete file', 'warning');
    } finally {
      setIsDeleting(false);
    }
  };

  const getMimeIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) return <Folder className="w-4 h-4 text-amber-500 shrink-0" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('csv')) return <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (mimeType.includes('image')) return <FileImage className="w-4 h-4 text-indigo-500 shrink-0" />;
    return <FileText className="w-4 h-4 text-neutral-500 shrink-0" />;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <HardDrive className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Google Drive & Farm Document Locker
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Sync farm decision dossiers, soil test records, APMC rate sheets, and foliar disease scans directly to your Google Drive.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Google Drive integration uses Google Workspace OAuth 2.0 with client-side token management. Your files are saved into your own Google Drive account."
      />

      {/* Auth Connection Banner */}
      {!isDriveConnected ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Connect Your Google Drive
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Authenticate to securely back up farm intelligence dossiers, export APMC mandi rate sheets, and organize soil health records in a dedicated <strong>KrushiAI Farm Records</strong> folder.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Automatic folder organization
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                In-memory credential security
              </span>
            </div>
          </div>

          {/* Official Google Sign-In Button style per Workspace skill */}
          <button
            onClick={() => connectDrive()}
            className="flex items-center gap-3 px-5 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {driveUser?.photoURL ? (
              <img
                src={driveUser.photoURL}
                alt={driveUser.displayName || 'Google User'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                {driveUser?.displayName?.charAt(0) || 'G'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {driveUser?.displayName || 'Google Drive Connected'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                {driveUser?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchFiles}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Files</span>
            </button>
            <button
              onClick={() => disconnectDrive()}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Quick Export Actions Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1: Export Full Farm Dossier */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm mb-1.5">
              <FileText className="w-4 h-4" />
              <span>Farm Decision Dossier</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Bundle your soil profile, crop recommendations, weather indicators, and seasonal agronomy into a Markdown report on Drive.
            </p>
          </div>
          <button
            onClick={handleExportFarmDossier}
            disabled={isExporting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Save Dossier to Drive'}</span>
          </button>
        </div>

        {/* Action 2: Export APMC Mandi Rates CSV */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-400 font-bold text-sm mb-1.5">
              <FileSpreadsheet className="w-4 h-4" />
              <span>APMC Rates Spreadsheet</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Save current Maharashtra mandi prices and modal rate comparisons directly as a CSV spreadsheet in Google Drive.
            </p>
          </div>
          <button
            onClick={handleExportMandiCSV}
            disabled={isExporting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Save Mandi CSV to Drive'}</span>
          </button>
        </div>

        {/* Action 3: Upload Custom Farm Document */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-400 font-bold text-sm mb-1.5">
              <UploadCloud className="w-4 h-4" />
              <span>Upload Soil Card or Receipt</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              Upload local lab reports, fertilizer invoices, or crop disease photos to your cloud folder.
            </p>
          </div>
          <div>
            <label className="block w-full cursor-pointer text-center px-4 py-2 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
              <span>{selectedUploadFile ? selectedUploadFile.name : 'Select File to Upload'}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedUploadFile(e.target.files[0]);
                    setUploadFileName(e.target.files[0].name);
                  }
                }}
              />
            </label>
            {selectedUploadFile && (
              <button
                onClick={handleUploadCustomFile}
                disabled={isExporting}
                className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white font-semibold text-xs transition-colors"
              >
                <span>Confirm Upload to Drive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Drive File Browser Container */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Google Drive Files
            </h3>
            <p className="text-xs text-neutral-500">
              Browse, open, or delete files stored in your Google Drive.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Drive files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!isDriveConnected}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600 w-48 sm:w-64"
              />
            </div>
            <button
              type="submit"
              disabled={!isDriveConnected || isLoading}
              className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors disabled:opacity-50"
            >
              Filter
            </button>
          </form>
        </div>

        {/* File Table / List */}
        {!isDriveConnected ? (
          <div className="py-12 text-center space-y-3">
            <HardDrive className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto" />
            <div>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Google Drive is not connected
              </p>
              <p className="text-xs text-neutral-400">
                Sign in above to inspect and manage your farm files.
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="py-12 text-center text-xs text-neutral-500 space-y-2">
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading files from Google Drive API...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Folder className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto" />
            <p className="text-xs text-neutral-500">
              No files found in Google Drive matching query. Export your first farm dossier above!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Name</th>
                  <th className="py-2.5 px-3 font-semibold">File Type</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Size</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Last Modified</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-3 font-medium text-neutral-900 dark:text-neutral-100 max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        {getMimeIcon(file.mimeType)}
                        <span className="truncate" title={file.name}>{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-neutral-500 font-mono text-[11px] truncate max-w-[140px]">
                      {file.mimeType.split('.').pop() || file.mimeType}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-neutral-500">
                      {file.size || '—'}
                    </td>
                    <td className="py-3 px-3 text-right text-neutral-500 tabular-nums">
                      {file.modifiedTime || '—'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-neutral-800"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => setFileToDelete(file)}
                          className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-neutral-800"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MANDATORY USER CONFIRMATION DIALOG FOR DESTRUCTIVE OPERATIONS */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Delete File from Google Drive?
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  This action will permanently remove the file from your Google Drive account.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Target File:
              </span>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {fileToDelete.name}
              </p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                ID: {fileToDelete.id}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Confirm & Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
