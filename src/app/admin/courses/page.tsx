'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  X,
  ArrowLeft,
  Sparkles,
  Layers,
  Video,
  ShieldCheck,
} from 'lucide-react';

interface Lesson {
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: string;
  order: number;
}

interface Module {
  title: string;
  order: number;
  lessons: Lesson[];
}

export default function AdminCourseBuilderPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  // Course Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [price, setPrice] = useState('999');
  const [originalPrice, setOriginalPrice] = useState('2999');
  const [duration, setDuration] = useState('7 Days');
  const [techStackInput, setTechStackInput] = useState('React, Node.js, MongoDB, TypeScript');
  const [published, setPublished] = useState(true);

  // Modules & Lessons State
  const [modules, setModules] = useState<Module[]>([
    {
      title: 'Module 1: Orientation & Fundamentals',
      order: 0,
      lessons: [
        { title: '1. Course Orientation & Tech Stack Setup', type: 'video', duration: '15:00', order: 0 },
        { title: '2. Fundamentals Deep Dive', type: 'video', duration: '25:00', order: 1 },
      ],
    },
  ]);

  const [notification, setNotification] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/v1/courses');
      setCourses(res.data || res || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        title: `Module ${modules.length + 1}: New Curriculum Module`,
        order: modules.length,
        lessons: [{ title: '1. Intro Lesson', type: 'video', duration: '15:00', order: 0 }],
      },
    ]);
  };

  const handleAddLesson = (moduleIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].lessons.push({
      title: `Lesson ${updated[moduleIndex].lessons.length + 1}: New Topic`,
      type: 'video',
      duration: '20:00',
      order: updated[moduleIndex].lessons.length,
    });
    setModules(updated);
  };

  const handleRemoveModule = (moduleIndex: number) => {
    setModules(modules.filter((_, idx) => idx !== moduleIndex));
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].lessons = updated[moduleIndex].lessons.filter((_, idx) => idx !== lessonIndex);
    setModules(updated);
  };

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const techStack = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);

    const payload = {
      title,
      description,
      category,
      level,
      price: parseFloat(price) || 0,
      originalPrice: parseFloat(originalPrice) || 0,
      duration,
      techStack,
      published,
      modules,
    };

    try {
      if (editingCourseId) {
        await apiClient.patch(`/api/v1/courses/${editingCourseId}`, payload);
        triggerToast(`✅ Course "${title}" updated in database!`);
      } else {
        await apiClient.post('/api/v1/courses', payload);
        triggerToast(`🎉 New Course "${title}" created & published live!`);
      }

      setShowModal(false);
      resetForm();
      fetchCourses();
    } catch (err: any) {
      alert(err.message || 'Failed to save course');
    }
  };

  const handleDeleteCourse = async (courseId: string, courseTitle: string) => {
    if (!confirm(`Are you sure you want to delete course "${courseTitle}" from database?`)) return;

    try {
      await apiClient.delete(`/api/v1/courses/${courseId}`);
      triggerToast(`🗑️ Course "${courseTitle}" deleted from database.`);
      fetchCourses();
    } catch (err: any) {
      alert(err.message || 'Failed to delete course');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Development');
    setLevel('Beginner');
    setPrice('999');
    setOriginalPrice('2999');
    setDuration('7 Days');
    setTechStackInput('React, Node.js, MongoDB, TypeScript');
    setPublished(true);
    setEditingCourseId(null);
    setModules([
      {
        title: 'Module 1: Orientation & Fundamentals',
        order: 0,
        lessons: [
          { title: '1. Course Orientation & Tech Stack Setup', type: 'video', duration: '15:00', order: 0 },
          { title: '2. Fundamentals Deep Dive', type: 'video', duration: '25:00', order: 1 },
        ],
      },
    ]);
  };

  const openEditModal = (c: any) => {
    setEditingCourseId(c._id);
    setTitle(c.title || '');
    setDescription(c.description || '');
    setCategory(c.category || 'Development');
    setLevel(c.level || 'Beginner');
    setPrice((c.price ?? 999).toString());
    setOriginalPrice((c.originalPrice ?? 2999).toString());
    setDuration(c.duration || '7 Days');
    setTechStackInput((c.techStack || []).join(', '));
    setPublished(c.published ?? true);
    setModules(c.modules && c.modules.length > 0 ? c.modules : [
      {
        title: 'Module 1: Orientation & Fundamentals',
        order: 0,
        lessons: [{ title: '1. Intro Lesson', type: 'video', duration: '15:00', order: 0 }],
      },
    ]);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] font-sans relative">
      {/* Header Bar */}
      <header className="bg-[#161B22] text-[#F5F7FA] border-b border-[#30363D] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] font-mono text-[#3B82F6] font-semibold uppercase tracking-wider block">SUPER ADMIN PORTAL</span>
              <h1 className="text-xl font-extrabold text-[#F5F7FA]">Course & Curriculum Builder</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="btn-primary px-5 py-2.5 text-xs flex items-center gap-2 font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-[#161B22] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#30363D] flex items-center gap-3 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Info Banner */}
        <div className="p-6 rounded-2xl bg-[#161B22] text-[#F5F7FA] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#30363D]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-extrabold text-[#F5F7FA]">Course Catalog Management</h2>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              Create, update, publish, or delete courses in real-time. All changes are stored directly in MongoDB Atlas and immediately visible to students.
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="btn-primary px-6 py-2.5 text-xs font-semibold shrink-0"
          >
            + Create New Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-4">
            <h2 className="text-lg font-extrabold text-[#F5F7FA]">All Courses in Database ({courses.length})</h2>
            <span className="text-xs font-mono font-semibold text-[#3B82F6]">Live MongoDB Connection</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-slate-500">Loading courses from database...</div>
          ) : courses.length === 0 ? (
            <div className="p-12 card-glass-dark bg-[#161B22] border border-[#30363D] text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-[#F5F7FA]">No courses created yet</h3>
              <p className="text-xs text-slate-400">Click &quot;Add New Course&quot; to build your first course module.</p>
              <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary px-5 py-2 text-xs">
                + Add First Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c._id} className="card-glass-dark p-6 space-y-4 flex flex-col justify-between bg-[#161B22] border border-[#30363D]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-[#1F2937] text-[#3B82F6] font-bold border border-[#30363D]">{c.category}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.published ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-amber-950/60 text-amber-300 border border-amber-800'}`}>
                        {c.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#F5F7FA] leading-snug">{c.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{c.description || 'No description provided.'}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(c.techStack || []).slice(0, 4).map((tech: string, i: number) => (
                        <span key={i} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 text-xs font-mono text-slate-400 border-t border-[#30363D]">
                      <span>{c.duration || '7 Days'} • {c.level || 'Beginner'}</span>
                      <span className="font-extrabold text-[#F5F7FA] text-sm">₹{c.price}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#30363D] flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="btn-secondary flex-1 py-2 text-xs flex items-center justify-center gap-1.5 font-semibold"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Edit Course</span>
                    </button>

                    <button
                      onClick={() => handleDeleteCourse(c._id, c.title)}
                      className="p-2 rounded-lg bg-[#0D1117] text-slate-400 hover:text-red-400 border border-[#30363D] transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* CREATE / EDIT COURSE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161B22] rounded-2xl max-w-3xl w-full p-8 shadow-2xl space-y-6 border border-[#30363D] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#1F2937] text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#30363D] pb-4">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase">CURRICULUM BUILDER</span>
              <h2 className="text-2xl font-extrabold text-[#F5F7FA] mt-1">
                {editingCourseId ? 'Edit Course & Modules' : 'Create New Course'}
              </h2>
            </div>

            <form onSubmit={handleSubmitCourse} className="space-y-6">

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-semibold text-[#F5F7FA] uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#3B82F6]" />
                  <span>1. Course Details</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Stack Next.js 15 & OpenAI SaaS Bootcamp"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Description *</label>
                  <textarea
                    rows={3}
                    placeholder="Provide a comprehensive summary of what students will learn..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                    >
                      <option>Development</option>
                      <option>AI</option>
                      <option>Data</option>
                      <option>Design</option>
                      <option>Cloud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Skill Level *</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Duration *</label>
                    <input
                      type="text"
                      placeholder="e.g. 7 Days (15 hrs/wk)"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Tech Stack Tags (Comma-Separated)</label>
                  <input
                    type="text"
                    placeholder="React, Next.js, Node.js, MongoDB, TypeScript"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#30363D] bg-[#0D1117] text-xs text-[#F5F7FA] font-medium"
                  />
                </div>
              </div>

              {/* Curriculum Modules & Lessons Builder */}
              <div className="space-y-4 pt-4 border-t border-[#30363D]">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-mono font-semibold text-[#F5F7FA] uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#3B82F6]" />
                    <span>2. Modules & Lessons ({modules.length} Modules)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="px-3 py-1.5 rounded-lg bg-[#1F2937] text-[#3B82F6] text-xs font-mono font-semibold border border-[#30363D]"
                  >
                    + Add Module
                  </button>
                </div>

                <div className="space-y-4">
                  {modules.map((mod, modIdx) => (
                    <div key={modIdx} className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => {
                            const updated = [...modules];
                            updated[modIdx].title = e.target.value;
                            setModules(updated);
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-[#30363D] text-xs font-bold text-[#F5F7FA] bg-[#161B22]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(modIdx)}
                          className="text-slate-400 hover:text-red-400 p-1.5"
                          title="Remove Module"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 pl-4 border-l-2 border-[#3B82F6]">
                        {mod.lessons.map((les, lesIdx) => (
                          <div key={lesIdx} className="flex items-center gap-2 bg-[#161B22] p-2.5 rounded-lg border border-[#30363D] text-xs">
                            <Video className="w-4 h-4 text-[#3B82F6] shrink-0" />
                            <input
                              type="text"
                              value={les.title}
                              onChange={(e) => {
                                const updated = [...modules];
                                updated[modIdx].lessons[lesIdx].title = e.target.value;
                                setModules(updated);
                              }}
                              className="flex-1 px-2.5 py-1 rounded border border-[#30363D] text-xs font-medium text-[#F5F7FA] bg-[#0D1117]"
                            />
                            <input
                              type="text"
                              placeholder="Duration"
                              value={les.duration}
                              onChange={(e) => {
                                const updated = [...modules];
                                updated[modIdx].lessons[lesIdx].duration = e.target.value;
                                setModules(updated);
                              }}
                              className="w-20 px-2 py-1 rounded border border-[#30363D] text-[11px] font-mono text-center bg-[#0D1117] text-[#F5F7FA]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(modIdx, lesIdx)}
                              className="text-slate-400 hover:text-red-400 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => handleAddLesson(modIdx)}
                          className="text-[11px] font-mono font-semibold text-[#3B82F6] hover:underline pt-1 block"
                        >
                          + Add Lesson to {mod.title.split(':')[0]}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish Toggle & Save */}
              <div className="pt-4 border-t border-[#30363D] space-y-4">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-mono font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 text-[#3B82F6] rounded focus:ring-blue-500"
                  />
                  <span>Publish Immediately (Visible to Students)</span>
                </label>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-xs font-semibold"
                >
                  {editingCourseId ? 'Save & Update Course' : 'Create & Publish Course →'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
