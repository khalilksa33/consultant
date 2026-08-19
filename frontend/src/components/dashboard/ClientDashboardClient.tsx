"use client";

import { useEffect, useState } from 'react';

type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  createdAt: string;
};

export default function ClientDashboardClient({ dict, lang }: { dict: any; lang: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userInfoStr = localStorage.getItem('userInfo');
        if (!userInfoStr) return;
        
        const userInfo = JSON.parse(userInfoStr);
        
        const res = await fetch('/api/projects/my-projects', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          setError(dict.projects.errorFetching);
        }
      } catch (err) {
        setError(dict.projects.errorFetching);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [dict]);

  if (loading) {
    return <div className="p-8 text-brand-slate">{dict.projects.loading}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold text-brand-teal mb-8">
        {dict.projects.myProjects}
      </h1>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>}

      {projects.length === 0 ? (
        <div className="bg-white p-8 rounded shadow-sm text-center border border-brand-mist">
          <p className="text-brand-slate/80 text-lg">
            {dict.projects.noProjects}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-brand-teal/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-brand-slate">{project.title}</h2>
                <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold">
                  {dict.projects.statusOptions[project.status] || project.status}
                </span>
              </div>
              <p className="text-brand-slate/70 mb-6 line-clamp-2">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-brand-slate">
                  <span>{dict.projects.progress}</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-brand-mist rounded-full h-2.5">
                  <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
