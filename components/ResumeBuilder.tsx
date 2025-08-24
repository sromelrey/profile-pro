"use client";

import { useState, useRef } from "react";
import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";
import { exportToPDF, printResume } from "@/lib/pdf-export";
import ResumeForm from "./ResumeForm";
import CodeEditor from "./CodeEditor";
import DefaultTemplate from "./resume-templates/DefaultTemplate";
import * as Tabs from "@radix-ui/react-tabs";
import { Download, Printer, Code, FileText, Eye } from "lucide-react";

// Default resume data
const defaultResumeData: ResumeData = {
  contact: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "Cebu City, Philippines",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },
  summary:
    "Experienced software engineer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.",
  experience: [
    {
      id: generateId(),
      company: "Tech Corp",
      position: "Senior Software Engineer",
      location: "Cebu City, Philippines",
      startDate: "2022-01-01",
      endDate: "",
      current: true,
      description:
        "Lead development of microservices architecture and mentor junior developers.",
      achievements: [
        "Led a team of 5 developers to deliver a new payment processing system",
        "Improved application performance by 40% through optimization",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      id: generateId(),
      company: "Startup Inc",
      position: "Full Stack Developer",
      location: "Cebu City, Philippines",
      startDate: "2020-03-01",
      endDate: "2021-12-31",
      current: false,
      description:
        "Developed and maintained web applications using React and Node.js.",
      achievements: [
        "Built a customer portal serving 10,000+ users",
        "Reduced bug reports by 30% through improved testing",
        "Collaborated with design team to implement new UI/UX features",
      ],
    },
  ],
  education: [
    {
      id: generateId(),
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2016-09-01",
      endDate: "2020-05-01",
      current: false,
      gpa: "3.8",
    },
  ],
  skills: [
    { id: generateId(), name: "JavaScript", level: "expert" },
    { id: generateId(), name: "React", level: "advanced" },
    { id: generateId(), name: "Node.js", level: "advanced" },
    { id: generateId(), name: "TypeScript", level: "intermediate" },
    { id: generateId(), name: "Python", level: "intermediate" },
    { id: generateId(), name: "AWS", level: "intermediate" },
  ],
  projects: [
    {
      id: generateId(),
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce",
    },
    {
      id: generateId(),
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      link: "https://task-app-demo.com",
      github: "https://github.com/johndoe/task-app",
    },
  ],
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeEditor, setActiveEditor] = useState<"form" | "code">("form");
  const [isExporting, setIsExporting] = useState(false);
  const [customHtml, setCustomHtml] = useState<string>("");
  const [useCustomHtml, setUseCustomHtml] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    setUseCustomHtml(false); // Reset to default template when form data changes
  };

  const handleCustomHtmlChange = (html: string) => {
    setCustomHtml(html);
    setUseCustomHtml(true); // Use custom HTML when code editor changes
  };

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    try {
      const success = await exportToPDF(
        resumeRef.current,
        `${resumeData.contact.name.replace(/\s+/g, "_")}_resume.pdf`
      );
      if (success) {
        console.log("PDF exported successfully");
      } else {
        console.error("Failed to export PDF");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (!resumeRef.current) return;
    printResume(resumeRef.current);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Resume Builder
              </h1>
              <p className='text-sm text-gray-600'>
                Create professional resumes with ease
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <button
                onClick={handlePrint}
                className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
              >
                <Printer size={16} />
                Print
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
              >
                <Download size={16} />
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Editor Panel */}
          <div className='space-y-6'>
            {/* Editor Toggle */}
            <div className='bg-white rounded-lg shadow-sm border p-4'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium text-gray-900'>Editor</h2>
                <div className='flex bg-gray-100 rounded-lg p-1'>
                  <button
                    onClick={() => setActiveEditor("form")}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeEditor === "form"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <FileText size={16} />
                    Form Editor
                  </button>
                  <button
                    onClick={() => setActiveEditor("code")}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeEditor === "code"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Code size={16} />
                    Code Editor
                  </button>
                </div>
              </div>

              {/* Editor Content */}
              {activeEditor === "form" ? (
                <ResumeForm data={resumeData} onDataChange={handleDataChange} />
              ) : (
                <CodeEditor
                  data={resumeData}
                  onDataChange={handleDataChange}
                  onCustomHtmlChange={handleCustomHtmlChange}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className='space-y-6'>
            <div className='bg-white rounded-lg shadow-sm border p-4'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium text-gray-900'>Preview</h2>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <Eye size={16} />
                  Live Preview
                </div>
              </div>

              {/* Resume Preview */}
              <div className='border border-gray-200 rounded-lg overflow-hidden'>
                <div
                  ref={resumeRef}
                  className='bg-white'
                  style={{ minHeight: "800px" }}
                >
                  {useCustomHtml && customHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: customHtml }} />
                  ) : (
                    <DefaultTemplate data={resumeData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
