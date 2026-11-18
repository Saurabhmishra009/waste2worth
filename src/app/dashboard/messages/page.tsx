'use client';

import React, { useState, useEffect } from 'react';
import { StorageService } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Message, User } from '@/types';
import {
  MessageSquare,
  Send,
  Building2,
  Clock,
  Package,
  ShieldCheck,
  Search,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('user_buyer_1');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [user]);

  const loadMessages = () => {
    if (!user) return;
    const all = StorageService.getMessages();
    setMessages(all);
    // If current user is buyer, default partner to seller
    if (user.id === 'user_buyer_1' && selectedPartnerId === 'user_buyer_1') {
      setSelectedPartnerId('user_seller_1');
    }
  };

  // Group conversations by the other participant
  const partnersMap: Record<
    string,
    { name: string; lastMsg: Message; unreadCount: number }
  > = {};

  messages.forEach((m) => {
    const isSender = m.senderId === user?.id;
    const partnerId = isSender ? m.receiverId : m.senderId;
    const partnerName = isSender ? m.receiverName : m.senderName;

    if (!partnersMap[partnerId] || new Date(m.timestamp) > new Date(partnersMap[partnerId].lastMsg.timestamp)) {
      partnersMap[partnerId] = {
        name: partnerName,
        lastMsg: m,
        unreadCount: !isSender && !m.read ? 1 : 0,
      };
    }
  });

  const partnerList = Object.entries(partnersMap).map(([id, info]) => ({
    id,
    ...info,
  }));

  // Fallback demo partners if list is empty
  const activePartners =
    partnerList.length > 0
      ? partnerList
      : [
          {
            id: 'user_seller_1',
            name: 'Rajesh Sharma (Sharma Polymers)',
            lastMsg: {
              content: 'Lab report attached for PET flakes batch.',
              timestamp: new Date().toISOString(),
            } as Message,
            unreadCount: 0,
          },
          {
            id: 'user_both_1',
            name: 'Vikram Singhania (Singhania Metals)',
            lastMsg: {
              content: 'Aluminium 6063 ingots ready for dispatch.',
              timestamp: new Date().toISOString(),
            } as Message,
            unreadCount: 0,
          },
        ];

  const currentPartner =
    activePartners.find((p) => p.id === selectedPartnerId) || activePartners[0];

  const conversationMessages = messages.filter(
    (m) =>
      (m.senderId === user?.id && m.receiverId === selectedPartnerId) ||
      (m.senderId === selectedPartnerId && m.receiverId === user?.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !inputText.trim()) return;

    StorageService.sendMessage({
      senderId: user.id,
      senderName: user.name,
      receiverId: selectedPartnerId,
      receiverName: currentPartner.name,
      listingId: conversationMessages[0]?.listingId || 'list_1',
      listingTitle: conversationMessages[0]?.listingTitle || 'Industrial Material Lot',
      content: inputText.trim(),
    });

    setInputText('');
    loadMessages();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Direct Commercial Messages
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Real-time encrypted communication between scrap generators, packaging mills, and raw material purchasers.
        </p>
      </div>

      {/* Main Messaging Interface Box */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Conversation List (4 cols) */}
        <div className="md:col-span-4 border-r border-gray-100 flex flex-col bg-[#F8FAF7]/50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
              Conversations
            </h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {activePartners.map((partner) => {
              const isSelected = selectedPartnerId === partner.id;
              return (
                <div
                  key={partner.id}
                  onClick={() => setSelectedPartnerId(partner.id)}
                  className={`p-4 cursor-pointer transition-colors text-xs space-y-1 ${
                    isSelected ? 'bg-white font-bold border-l-4 border-[#14532D]' : 'hover:bg-gray-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 truncate max-w-[170px]">
                      {partner.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(partner.lastMsg.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{partner.lastMsg.content}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Chat Interface (8 cols) */}
        <div className="md:col-span-8 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-100 text-[#14532D] flex items-center justify-center font-bold">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{currentPartner?.name}</h3>
                <p className="text-[11px] text-gray-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald" /> Verified Enterprise Contact
                </p>
              </div>
            </div>

            {conversationMessages[0]?.listingTitle && (
              <span className="text-[11px] font-semibold text-emerald bg-forest-50 px-2.5 py-1 rounded-full border border-forest-100 hidden sm:inline-block">
                Ref: {conversationMessages[0].listingTitle.slice(0, 30)}...
              </span>
            )}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[460px] bg-[#F8FAF7]/30">
            {conversationMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                Start a conversation by typing a message below.
              </div>
            ) : (
              conversationMessages.map((m) => {
                const isMine = m.senderId === user?.id;

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMine
                          ? 'bg-[#14532D] text-white rounded-br-xs shadow-sm'
                          : 'bg-white text-gray-800 rounded-bl-xs border border-gray-200 shadow-2xs'
                      }`}
                    >
                      {m.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {new Date(m.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type message regarding material lot, logistics, or delivery..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#14532D] hover:bg-forest-800 text-white rounded-xl shadow transition-colors"
              title="Send message"
            >
              <Send className="w-4 h-4 text-emerald" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
