import React from 'react';
import { AlertCircle, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrototypeBannerProps {
  subtext?: string;
  compact?: boolean;
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({ 
  subtext,
  compact = false 
}) => {
  const { t } = useApp();
  const displaySubtext = subtext || t('prototypeBanner.subtext');

  if (compact) {
    return (
      <div className="flex items-center gap-2 py-1 px-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 rounded-lg text-xs text-amber-800 dark:text-amber-300">
        <Cpu className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="font-semibold uppercase tracking-wider text-[10px]">{t('common.prototypeTag')}</span>
        <span className="text-amber-700/80 dark:text-amber-300/80 truncate">{displaySubtext}</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-amber-50/90 dark:bg-amber-950/30 border-y sm:border sm:rounded-xl border-amber-200/70 dark:border-amber-800/40 p-3.5 sm:p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
              {t('prototypeBanner.noticeTitle')}
            </h4>
            <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
              · {t('common.simulatedInference')}
            </span>
          </div>
          <p className="text-xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
            {displaySubtext}
          </p>
        </div>
      </div>
    </div>
  );
};
