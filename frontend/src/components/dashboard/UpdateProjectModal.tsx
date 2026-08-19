"use client";

import { useState, useEffect } from 'react';

type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
};

type UpdateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
  project: Project | null;
  onProjectUpdated: () => void;
  lang: string;
};

export default function UpdateProjectModal({ isOpen, onClose, dict, project, onProjectUpdated, lang }: UpdateProjectModalProps) {
  const [status, setStatus] = useState('Pending');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setStatus(project.status);
      setProgress(project.progress);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) return;
      const userInfo = JSON.parse(userInfoStr);

      const res = await fetch(`/api/projects/${project._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ status, progress }),
      });

      if (res.ok) {
        onProjectUpdated();
        onClose();
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
          <h2 className="text-xl font-bold text-brand-teal">{dict.editProject}</h2>
          <button onClick={onClose} className="text-brand-slate hover:text-brand-orange transition-colors">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded text-sm">{error}</div>}
          
          <div className="mb-4 bg-brand-ivory p-3 rounded text-brand-slate">
            <strong>{dict.title}:</strong> {project.title}
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

          <div>
            <label className="block text-sm font-medium text-brand-slate mb-1">
              {dict.progress}: {progress}%
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full"
            />
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
              className="px-4 py-2 bg-brand-orange text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? dict.loading : dict.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
