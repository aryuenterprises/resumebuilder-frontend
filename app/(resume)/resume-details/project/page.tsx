"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  FiChevronDown,
  FiTrash2,
  FiX,
  FiCheckCircle,
  FiXCircle,
  FiShield,
  FiMenu,
} from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import dynamic from "next/dynamic";
import { CreateContext } from "@/app/context/CreateContext";
import { FaRegLightbulb, FaStar, FaGem } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { Project } from "@/app/types";
import { Stepper, TipsModal } from "@/app/components/resume";
import api from "@/app/utils/api";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
        <div className="animate-pulse text-gray-400 text-sm">
          Loading editor...
        </div>
      </div>
    ),
  },
);

const ProjectsForm = () => {
  const UseContext = useContext(CreateContext);
  // const contactId =  UseContext?.contact.contactId;
  // const latestResumeId = localStorage.getItem("latest_resume_id");
      const latestResumeId = getLocalStorage("latest_resume_id");


  const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

  const { projects, setProjects } = UseContext || {};

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [projectsTipsClicked, setProjectsTipsClicked] = useState(false);
  const [techInput, setTechInput] = useState<{ [key: string]: string }>({});

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(null);

  const addProject = () => {
    if (!setProjects) return;

    setProjects((prev: Project[]) => {
      const updated = [
        ...prev,
        {
          id: Date.now(),
          title: "",
          techStack: [],
          description: "",
          liveUrl: "",
          githubUrl: "",
          isOpen: true,
          error: {},
        },
      ];
      return updated;
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string | number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
    // Add a class to the dragged element
    (e.target as HTMLElement).classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItemId(null);
    setDragOverItemId(null);
    // Remove the opacity class
    (e.target as HTMLElement).classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent, id: string | number) => {
    e.preventDefault();
    if (draggedItemId === null) return;
    if (draggedItemId !== id) {
      setDragOverItemId(id);
    }
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string | number) => {
    e.preventDefault();
    
    if (draggedItemId === null) return;
    if (draggedItemId === targetId) return;

    // Reorder the projects array
    if (setProjects) {
      setProjects((prev: Project[]) => {
        const draggedIndex = prev.findIndex(project => project.id === draggedItemId);
        const targetIndex = prev.findIndex(project => project.id === targetId);
        
        if (draggedIndex === -1 || targetIndex === -1) return prev;
        
        const newProjects = [...prev];
        const [draggedItem] = newProjects.splice(draggedIndex, 1);
        newProjects.splice(targetIndex, 0, draggedItem);
        
        return newProjects;
      });
    }
    
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const saveToAPI = async (projectsData: Project[]) => {
    // if (!contactId) {
    //   console.error("Contact ID is required");
    //   return false;
    // }

    setIsSaving(true);

    try {



          const singlePayload = {
        "section_name": "projects",
          "section_payload": projectsData
      }
    
    

    // 3. Send it as standard 'application/json'
    const response = await api.patch(`${API_URL}/user-resumes/${latestResumeId}`,singlePayload);

      // const formData = {
      //   projects: projectsData,
      // };

      // await axios.post(`${API_URL}/api/project-resume/update`, formData, {
      //   params: { contactId: contactId },
      // });

      // fetchProjects();
      return true;
    } catch (err: any) {
      console.error("Error saving projects:", err);
      toast.error("Failed to save Projects!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleForm = (id: string | number) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) =>
      prev.map((project) =>
        project.id === id ? { ...project, isOpen: !project.isOpen } : project,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Project,
    value: string | string[],
  ) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) => {
      const updated = prev.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      );
      return updated;
    });
  };


  const deleteProject = (id: string | number) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) => {
      const updated = prev.filter((project) => project.id !== id);
      return updated;
    });
  };

  const addTechStack = (projectId: string | number) => {
    const techValue = techInput[projectId] || "";
    if (techValue.trim()) {
      const project = projects?.find((p: Project) => p.id === projectId);
      if (project && !project?.techStack?.includes(techValue.trim())) {
        handleChange(projectId, "techStack", [
          ...project.techStack,
          techValue.trim(),
        ]);
        setTechInput((prev) => ({ ...prev, [projectId]: "" }));
      }
    }
  };

  const removeTechStack = (projectId: string | number, tech: string) => {
    const project = projects?.find((p: Project) => p.id === projectId);
    if (project) {
      handleChange(
        projectId,
        "techStack",
        project.techStack.filter((t: string) => t !== tech),
      );
    }
  };

  const fetchProjects = async () => {
    if (!contactId) return;

    try {
      const response = await axios.get(
        `${API_URL}/api/project-resume/get-project-resume/${contactId}`,
      );

      const projectsList = response.data?.data?.projects || [];

      if (projectsList.length > 0) {
        const formattedData = projectsList.map((item: any) => ({
          id: item.id || Date.now(),
          title: item.title || "",
          techStack: item.techStack || [],
          description: item.description || "",
          liveUrl: item.liveUrl || "",
          githubUrl: item.githubUrl || "",
          isOpen: true,
        }));
        setProjects(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Projects
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your best work and technical projects
            </p>

            <button
              onClick={() => setProjectsTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Project Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Portfolio Projects
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Showcase your best work and technical projects
                    </p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                      Saving...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {projects?.map((project: Project, index: number) => (
                <div
                  key={project.id}
                
                  className={`bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4 
                    ${draggedItemId === project.id ? 'opacity-50' : ''}
                    ${dragOverItemId === project.id ? 'border-2 border-indigo-400 shadow-lg transform scale-[1.02]' : ''}
                  `}
                >
                  {/* Header */}
                  <div
                    draggable={true}
                  onDragStart={(e) => handleDragStart(e, project.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, project.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, project.id)}
                    onClick={() => toggleForm(project.id)}
                    className="flex justify-between items-center cursor-pointer p-4 sm:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Drag Handle Icon */}
                      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 text-gray-400 group-hover:text-indigo-400 transition-colors cursor-move">
                        <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
                          {project.title || "Project Title"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                          <span className="truncate max-w-30 sm:max-w-none">
                            {project.techStack.length > 0
                              ? project.techStack.join(", ")
                              : "No tech stack added"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 ml-2">
                      <motion.div
                        animate={{ rotate: project.isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                      >
                        <FiChevronDown size={14} className="sm:w-5 sm:h-5" />
                      </motion.div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        className="p-1.5 sm:p-2 rounded-lg bg-gray-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                        type="button"
                      >
                        <FiTrash2 size={14} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      project.isOpen
                        ? "max-h-250 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                      {/* Project Title */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title || ""}
                          onChange={(e) =>
                            handleChange(project.id, "title", e.target.value)
                          }
                          placeholder="E-Commerce Platform"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Tech Stack
                        </label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={techInput[project.id] || ""}
                            onChange={(e) =>
                              setTechInput((prev) => ({
                                ...prev,
                                [project.id]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && addTechStack(project.id)
                            }
                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            placeholder="React, Node.js, MongoDB"
                          />
                          <button
                            onClick={() => addTechStack(project.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors text-sm font-medium"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech: string) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 text-indigo-700 text-xs rounded-lg"
                            >
                              {tech}
                              <button
                                onClick={() =>
                                  removeTechStack(project.id, tech)
                                }
                                className="hover:text-indigo-900 ml-1"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Live URL & GitHub URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                            Live URL
                          </label>
                          <input
                            type="url"
                            value={project.liveUrl || ""}
                            onChange={(e) =>
                              handleChange(
                                project.id,
                                "liveUrl",
                                e.target.value,
                              )
                            }
                            placeholder="https://your-project.com"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={project.githubUrl || ""}
                            onChange={(e) =>
                              handleChange(
                                project.id,
                                "githubUrl",
                                e.target.value,
                              )
                            }
                            placeholder="https://github.com/username/project"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Project Description
                        </label>
                        <Editor
                          className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                          value={project.description || ""}
                          headerTemplate={
                            <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                              <button
                                type="button"
                                className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
                              >
                                B
                              </button>
                              <button
                                type="button"
                                className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
                              >
                                I
                              </button>
                              <button
                                type="button"
                                className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
                              >
                                U
                              </button>
                              <button
                                type="button"
                                className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                value="ordered"
                              >
                                1.
                              </button>
                              <button
                                type="button"
                                className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                value="bullet"
                              >
                                •
                              </button>
                              <button
                                type="button"
                                className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
                              >
                                ⌫
                              </button>
                            </div>
                          }
                          onTextChange={(e: any) => {
                            handleChange(
                              project.id,
                              "description",
                              e.htmlValue,
                            );
                          }}
                          style={{
                            height: "140px",
                            minHeight: "140px",
                            background: "white",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Project Button */}
              <button
                onClick={addProject}
                className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                type="button"
              >
                <div className="flex items-center justify-center gap-2">
                  <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Add Project
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/skills")}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {/* Hide text on mobile, show on sm and up */}
              <span className="hidden sm:inline">Back to Skills</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                if (projects) {
                  saveToAPI(projects).then(() =>
                    router.push("/resume-details/summary"),
                  );
                } else {
                  router.push("/resume-details/summary");
                }
              }}
            >
              {/* Gradient Background with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {/* Different text for mobile vs desktop */}
                <span>Continue to Summary</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Shadow Enhancement */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

      <TipsModal
        isOpen={projectsTipsClicked}
        onClose={() => setProjectsTipsClicked(false)}
        title="Project Tips"
        subtitle="Showcase your best work"
        hasAI={false}
        proTip="Pick 3-5 projects that best match the job you're applying for"
        bestPractices={[
          {
            tip: "Showcase your best and relevant work",
            example: "Pick projects related to the job",
          },
          {
            tip: "Include measurable results",
            example: "Reduced load time by 40%",
          },
          { tip: "Add live demo links", example: "Deployed project URL" },
        ]}
        avoidList={[
          "Adding unfinished projects",
          "Making it too technical for recruiters",
        ]}
      />
    </div>
  );
};

export default ProjectsForm;
