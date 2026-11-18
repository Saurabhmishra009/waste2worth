'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/lib/storage';
import { Notification } from '@/types';
import { Bell, CheckCheck, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NotificationDropdown() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const load = () => {
      setNotifications(StorageService.getNotifications(user.id));
    };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    if (user) {
      StorageService.markAllNotificationsAsRead(user.id);
      setNotifications(StorageService.getNotifications(user.id));
    }
  };

  const handleNotificationClick = (id: string) => {
    StorageService.markNotificationAsRead(id);
    if (user) {
      setNotifications(StorageService.getNotifications(user.id));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-forest-900 hover:bg-forest-50 rounded-full transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[10px] font-bold text-white shadow">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-3 bg-[#14532D] text-white">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald" />
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-[#10B981] text-forest-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-forest-100 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  href={n.link}
                  onClick={() => handleNotificationClick(n.id)}
                  className={`block p-3.5 transition-colors hover:bg-[#F8FAF7] ${
                    !n.read ? 'bg-forest-50/60 font-medium' : 'text-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-gray-900">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(n.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-emerald hover:underline flex items-center gap-0.5">
                      View details <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
            <Link
              href="/dashboard/inquiries"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[#14532D] hover:text-emerald transition-colors"
            >
              View Inquiries & Orders Hub →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
