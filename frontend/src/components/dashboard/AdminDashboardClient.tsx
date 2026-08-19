"use client";

import { useEffect, useState } from 'react';
import CreateProjectModal from '@/components/dashboard/CreateProjectModal';
import UpdateProjectModal from '@/components/dashboard/UpdateProjectModal';

type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  client: { _id: string; name: string; email: string };
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function AdminDashboardClient({ dict, lang }: { dict: any; lang: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchData = async () => {
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) return;
      const userInfo = JSON.parse(userInfoStr);

      const [projectsRes, clientsRes] = await Promise.all([
        fetch('/api/projects', { headers: { Authorization: `Bearer ${userInfo.token}` } }),
        fetch('/api/auth/clients', { headers: { Authorization: `Bearer ${userInfo.token}` } })
      ]);

      if (projectsRes.ok && clientsRes.ok) {
        setProjects(await projectsRes.json());
        setClients(await clientsRes.json());
      } else {
        setError(dict.projects.errorFetching);
      }
    } catch (err) {
      setError(dict.projects.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openUpdateModal = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };

  if (loading) return <div className="p-8 text-brand-slate">{dict.projects.loading}</div>;

  return (
    <div className="p-8 bg-brand-mist min-h-[70vh]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-slate">{dict.portals.adminTitle}</h1>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-brand-teal text-white px-4 py-2 rounded shadow-sm hover:bg-opacity-90 font-bold"
          >
            {dict.projects.createProject}
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-slate text-white">
                <th className="p-4">{dict.projects.title}</th>
                <th className="p-4">{dict.projects.client}</th>
                <th className="p-4">{dict.projects.status}</th>
                <th className="p-4">{dict.projects.progress}</th>
                <th className="p-4 text-center">{dict.projects.actions}</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-slate">
                    {dict.projects.noProjects}
                  </td>
                </tr>
              ) : (
                projects.map(project => (
                  <tr key={project._id} className="border-b border-brand-mist hover:bg-brand-ivory/30">
                    <td className="p-4 font-medium text-brand-slate">{project.title}</td>
                    <td className="p-4 text-brand-slate/80">{project.client?.name || 'N/A'}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold">
                        {dict.projects.statusOptions[project.status] || project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-brand-mist rounded-full h-2.5 max-w-[150px]">
                        <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-brand-slate mt-1 block">{project.progress}%</span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => openUpdateModal(project)}
                        className="text-brand-orange hover:underline font-medium text-sm"
                      >
                        {dict.projects.editProject}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        dict={dict.projects}
        clients={clients}
        lang={lang}
        onProjectCreated={fetchData}
      />

      <UpdateProjectModal 
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedProject(null);
        }}
        dict={dict.projects}
        project={selectedProject}
        lang={lang}
        onProjectUpdated={fetchData}
      />
    </div>
  );
}
