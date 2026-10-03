import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { DriveFileItem } from '../types';

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// All Google Drive scopes configured for the applet
export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.meet.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts',
];

const provider = new GoogleAuthProvider();
DRIVE_SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token storage (NEVER stored in localStorage or sessionStorage per security contract)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initialize auth listener. Clears memory token on logout.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token must be acquired via interactive sign-in popup
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Interactive Google Sign-In with popup
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google Auth Provider.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Returns current access token from memory
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sign out and clear in-memory credentials
 */
export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * List files from Google Drive
 */
export const listDriveFiles = async (
  query?: string,
  pageSize = 20
): Promise<DriveFileItem[]> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated. Please connect Google Drive first.');
  }

  let url = `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,iconLink)&orderBy=modifiedTime desc`;
  
  // Exclude trashed files by default
  let q = "trashed = false";
  if (query && query.trim().length > 0) {
    q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
  }
  url += `&q=${encodeURIComponent(q)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Google Drive API error: ${response.status}`);
  }

  const data = await response.json();
  return (data.files || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    size: f.size ? formatBytes(parseInt(f.size)) : undefined,
    createdTime: f.createdTime ? new Date(f.createdTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined,
    modifiedTime: f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : undefined,
    webViewLink: f.webViewLink,
    iconLink: f.iconLink,
  }));
};

/**
 * Create or locate a specific folder in Google Drive (e.g. 'KrushiAI Farm Records')
 */
export const getOrCreateFolder = async (folderName = 'KrushiAI Farm Records'): Promise<string> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated.');

  // Search for existing folder
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  )}&fields=files(id,name)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // Create new folder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });

  if (!createRes.ok) {
    throw new Error('Failed to create folder in Google Drive.');
  }

  const createdData = await createRes.json();
  return createdData.id;
};

/**
 * Upload a file (JSON, Markdown, Image, or Document) to Google Drive using multipart upload
 */
export const uploadFileToDrive = async (
  fileName: string,
  content: string | Blob,
  contentType: string,
  folderId?: string
): Promise<DriveFileItem> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated.');

  const metadata: any = {
    name: fileName,
    mimeType: contentType,
  };

  if (folderId) {
    metadata.parents = [folderId];
  }

  const boundary = '-------KrushiAIBoundary' + Math.random().toString(36).substring(2);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  let contentBody: string;
  if (typeof content === 'string') {
    contentBody = content;
  } else {
    // If blob, convert to text or base64
    contentBody = await content.text();
  }

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${contentType}\r\n\r\n` +
    contentBody +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,iconLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to upload file to Google Drive: ${response.status}`);
  }

  const file = await response.json();
  return {
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    size: file.size ? formatBytes(parseInt(file.size)) : undefined,
    webViewLink: file.webViewLink,
    iconLink: file.iconLink,
  };
};

/**
 * Delete file from Google Drive (Requires explicit confirmation before invocation)
 */
export const deleteDriveFile = async (fileId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated.');

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to delete file from Google Drive.`);
  }
};

/**
 * Helper to format byte counts into human readable sizes
 */
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
