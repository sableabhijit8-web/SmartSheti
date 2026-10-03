import React from 'react';
import { 
  X, 
  Bell, 
  CloudRain, 
  TrendingUp, 
  Droplets, 
  Sprout, 
  AlertTriangle, 
  CheckCheck,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    notifications, 
    unreadCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useApp();

  if (!isNotificationsOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'rain':
        return <CloudRain className="w-4 h-4 text-sky-600" />;
      case 'market':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'irrigation':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'crop':
        return <Sprout className="w-4 h-4 text-lime-600" />;
      case 'disease':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Farm Notifications
                </h3>
                <p className="text-xs text-neutral-500">
                  {unreadCount > 0 ? `${unreadCount} unread advisories` : 'All caught up'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 font-medium px-2 py-1 rounded hover:bg-emerald-50 dark:hover:bg-neutral-800"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                aria-label="Close notifications panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800 p-2 sm:p-3">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-neutral-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications right now</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl transition-all my-1 ${
                    !item.read
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-xs border border-neutral-100 dark:border-neutral-700 mt-0.5 shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-neutral-400 whitespace-nowrap tabular-nums">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between pt-1">
                        <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-neutral-400">
                          Demo Advisory
                        </span>
                        {!item.read && (
                          <button
                            onClick={() => markNotificationAsRead(item.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 text-center bg-neutral-50/50 dark:bg-neutral-900/50">
            Advisories demonstrate push notifications from future weather & APMC services
          </div>
        </div>
      </div>
    </div>
  );
};
