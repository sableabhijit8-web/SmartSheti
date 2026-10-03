import React from 'react';
import { Sparkles, Sprout, AlertCircle, RefreshCw, FolderSearch } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Analyzing farm data...',
  submessage = 'Synthesizing soil chemistry, local weather patterns, and agronomic guidelines.'
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-xs">
          <Sprout className="w-7 h-7 text-emerald-700 dark:text-emerald-400 animate-bounce" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs animate-spin">
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          {message}
        </h4>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {submessage}
        </p>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon: Icon = FolderSearch
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
      <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Process Agronomic Model',
  message = 'A temporary error occurred while processing farm telemetry. Please verify input parameters and retry.',
  onRetry
}) => {
  return (
    <div className="p-8 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-sm font-bold text-red-900 dark:text-red-200">
          {title}
        </h4>
        <p className="text-xs text-red-700/80 dark:text-red-300/80 leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
};
