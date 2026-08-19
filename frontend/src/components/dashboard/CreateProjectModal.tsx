"use client";

import { useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
};

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
  clients: User[];
  onProjectCreated: () => void;
  lang: string;
};

export default function CreateProjectModal({ isOpen, onClose, dict, clients, onProjectCreated, lang }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) return;
      const userInfo = JSON.parse(userInfoStr);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ title, description, client, status }),
      });

      if (res.ok) {
        onProjectCreated();
        onClose();
        setTitle('');
        setDescription('');
        setClient('');
        setStatus('Pending');
      } else {
        const data = await res.json();
        setError(data.message || dict.errorSaving);
      }
    } catch (err) {
      setError(dict.errorSaving);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="px-6 py-4 border-b border-brand-mist flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-teal">{dict.createProject}</h2>
          <button onClick={onClose} className="text-brand-slate hover:text-brand-orange transition-colors">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-brand-slate mb-1">{dict.title}</label>
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-brand-mist rounded focus:ring-1 focus:ring-brand-teal outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-slate mb-1">{dict.description}</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-brand-mist rounded focus:ring-1 focus:ring-brand-teal outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-slate mb-1">{dict.client}</label>
            <select 
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-3 py-2 border border-brand-mist rounded focus:ring-1 focus:ring-brand-teal outline-none"
            >
              <option value="" disabled>{dict.selectClient}</option>
              {clients.map(c => (
                <option key={c._id} value={c._id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-slate mb-1">{dict.status}</label>
            <select 
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-brand-mist rounded focus:ring-1 focus:ring-brand-teal outline-none"
            >
              {Object.keys(dict.statusOptions).map(key => (
                <option key={key} value={key}>{dict.statusOptions[key]}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse mt-6 pt-4 border-t border-brand-mist">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-brand-slate hover:bg-brand-mist rounded transition-colors"
            >
              {dict.cancel}
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-brand-teal text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? dict.loading : dict.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
