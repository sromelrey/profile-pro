"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";

interface CodeEditorProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onCustomHtmlChange?: (html: string) => void;
}

export default function CodeEditor({
  data,
  onDataChange,
  onCustomHtmlChange,
}: CodeEditorProps) {
  const [htmlCode, setHtmlCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  // Generate HTML structure from resume data
  const generateHTML = (resumeData: ResumeData) => {
    const { contact, summary, experience, education, skills, projects } =
      resumeData;

    return `<!-- Resume HTML Structure -->
<div class="max-w-4xl mx-auto bg-white shadow-lg p-8 font-sans">
  <!-- Header -->
  <header class="border-b-2 border-gray-300 pb-6 mb-6">
    <h1 class="text-4xl font-bold text-gray-800 mb-2">${contact.name}</h1>
    <div class="text-gray-600 space-y-1">
      <p>${contact.email} • ${contact.phone}</p>
      <p>${contact.location}</p>
      ${
        contact.linkedin || contact.github || contact.website
          ? `
      <div class="flex gap-4 text-sm">
        ${
          contact.linkedin
            ? `<a href="${contact.linkedin}" class="text-blue-600 hover:underline">LinkedIn</a>`
            : ""
        }
        ${
          contact.github
            ? `<a href="${contact.github}" class="text-blue-600 hover:underline">GitHub</a>`
            : ""
        }
        ${
          contact.website
            ? `<a href="${contact.website}" class="text-blue-600 hover:underline">Website</a>`
            : ""
        }
      </div>`
          : ""
      }
    </div>
  </header>

  <!-- Summary -->
  ${
    summary
      ? `
  <section class="mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
      Professional Summary
    </h2>
    <p class="text-gray-700 leading-relaxed">${summary}</p>
  </section>`
      : ""
  }

  <!-- Experience -->
  ${
    experience.length > 0
      ? `
  <section class="mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1">
      Professional Experience
    </h2>
    <div class="space-y-4">
      ${experience
        .map(
          (exp) => `
      <div class="border-l-4 border-blue-500 pl-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-semibold text-gray-800">${exp.position}</h3>
            <p class="text-gray-600">${exp.company} • ${exp.location}</p>
          </div>
          <span class="text-sm text-gray-500">
            ${new Date(exp.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })} - ${
            exp.current
              ? "Present"
              : new Date(exp.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
          }
          </span>
        </div>
        <p class="text-gray-700 mb-2">${exp.description}</p>
        ${
          exp.achievements.length > 0
            ? `
        <ul class="list-disc list-inside text-gray-700 space-y-1">
          ${exp.achievements
            .map((achievement) => `<li>${achievement}</li>`)
            .join("")}
        </ul>`
            : ""
        }
      </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  <!-- Education -->
  ${
    education.length > 0
      ? `
  <section class="mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1">
      Education
    </h2>
    <div class="space-y-4">
      ${education
        .map(
          (edu) => `
      <div class="border-l-4 border-green-500 pl-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-semibold text-gray-800">${edu.degree} in ${
            edu.field
          }</h3>
            <p class="text-gray-600">${edu.institution}</p>
            ${
              edu.gpa
                ? `<p class="text-sm text-gray-500">GPA: ${edu.gpa}</p>`
                : ""
            }
          </div>
          <span class="text-sm text-gray-500">
            ${new Date(edu.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })} - ${
            edu.current
              ? "Present"
              : new Date(edu.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
          }
          </span>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  <!-- Skills -->
  ${
    skills.length > 0
      ? `
  <section class="mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1">
      Skills
    </h2>
    <div class="grid grid-cols-2 gap-4">
      ${skills
        .map(
          (skill) => `
      <div class="flex justify-between items-center">
        <span class="font-medium text-gray-700">${skill.name}</span>
        <span class="text-sm text-gray-500 capitalize">${skill.level}</span>
      </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  <!-- Projects -->
  ${
    projects.length > 0
      ? `
  <section class="mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1">
      Projects
    </h2>
    <div class="space-y-4">
      ${projects
        .map(
          (project) => `
      <div class="border-l-4 border-purple-500 pl-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-semibold text-gray-800">${project.name}</h3>
          <div class="flex gap-2">
            ${
              project.link
                ? `<a href="${project.link}" class="text-blue-600 hover:underline text-sm">Live Demo</a>`
                : ""
            }
            ${
              project.github
                ? `<a href="${project.github}" class="text-blue-600 hover:underline text-sm">GitHub</a>`
                : ""
            }
          </div>
        </div>
        <p class="text-gray-700 mb-2">${project.description}</p>
        <div class="flex flex-wrap gap-2">
          ${project.technologies
            .map(
              (tech) => `
          <span class="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">${tech}</span>`
            )
            .join("")}
        </div>
      </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }
</div>`;
  };

  // Syntax highlighting function
  const syntaxHighlight = (line: string) => {
    if (!line.trim()) return <span className='text-gray-600'>{line}</span>;

    // HTML tags
    const highlighted = line
      .replace(
        /(<\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(>)/g,
        '<span class="text-blue-400">$1</span><span class="text-yellow-400">$2</span><span class="text-gray-300">$3</span><span class="text-blue-400">$4</span>'
      )
      // Comments
      .replace(
        /(<!--)(.*?)(-->)/g,
        '<span class="text-green-500 italic">$1$2$3</span>'
      )
      // Attributes
      .replace(
        /([a-zA-Z-]+)=/g,
        '<span class="text-purple-400">$1</span><span class="text-gray-300">=</span>'
      )
      // String values
      .replace(/(")([^"]*?)(")/g, '<span class="text-orange-400">$1$2$3</span>')
      // CSS classes
      .replace(
        /(class=")([^"]*?)(")/g,
        '<span class="text-purple-400">class</span><span class="text-gray-300">=</span><span class="text-orange-400">"</span><span class="text-cyan-400">$2</span><span class="text-orange-400">"</span>'
      )
      // Tailwind classes
      .replace(
        /(bg-|text-|border-|rounded-|p-|m-|w-|h-|flex|grid|space-|gap-|transition-|hover:|focus:)/g,
        '<span class="text-cyan-400">$1</span>'
      )
      // Numbers
      .replace(/(\d+)/g, '<span class="text-green-400">$1</span>')
      // Curly braces for template literals
      .replace(/(\$\{)/g, '<span class="text-yellow-500">$1</span>')
      .replace(/(\})/g, '<span class="text-yellow-500">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  // Update HTML code when data changes
  useEffect(() => {
    try {
      const html = generateHTML(data);
      setHtmlCode(html);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  }, [data]);

  return (
    <div className='bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-2xl'>
      {/* VS Code-like Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <h3 className='text-lg font-semibold text-gray-200 tracking-wide'>
            HTML Code Editor
          </h3>
        </div>
        <div className='flex items-center gap-3'>
          {!isValid && (
            <span className='text-red-400 text-sm font-medium'>
              Invalid HTML
            </span>
          )}
          <div className='flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700/50'>
            <div className='w-2 h-2 rounded-full bg-green-400'></div>
            <span className='text-xs text-gray-400 font-mono'>HTML</span>
          </div>
        </div>
      </div>

      {/* VS Code-like Editor */}
      <div className='bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl'>
        {/* Editor Toolbar */}
        <div className='bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <span className='text-xs text-gray-400 font-mono'>resume.html</span>
            <div className='flex items-center gap-2'>
              <div
                className={`w-1 h-1 rounded-full ${
                  isEditable ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  isEditable ? "text-green-400" : "text-gray-500"
                }`}
              >
                {isEditable ? "Editable" : "Read-only"}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsEditable(!isEditable)}
              className={`text-xs transition-colors px-2 py-1 rounded hover:bg-gray-800/50 ${
                isEditable
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {isEditable ? "🔒 Lock" : "✏️ Edit"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(htmlCode);
                // You could add a toast notification here
              }}
              className='text-xs text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-800/50'
            >
              Copy
            </button>
            <button
              onClick={() => {
                // Format the HTML code (basic formatting)
                const formatted = htmlCode
                  .replace(/></g, ">\n<")
                  .replace(/\n\s*\n/g, "\n")
                  .split("\n")
                  .map((line) => line.trim())
                  .filter((line) => line.length > 0)
                  .join("\n");
                setHtmlCode(formatted);
              }}
              className='text-xs text-gray-400 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-gray-800/50'
            >
              Format
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className='relative'>
          {/* Line Numbers */}
          <div className='absolute left-0 top-0 w-12 bg-gray-900 border-r border-gray-800 text-right py-4'>
            {htmlCode.split("\n").map((_, index) => (
              <div
                key={index}
                className='text-xs text-gray-600 font-mono px-2 py-0.5'
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className='pl-12'>
            {isEditable ? (
              <textarea
                value={htmlCode}
                onChange={(e) => {
                  const newHtml = e.target.value;
                  setHtmlCode(newHtml);
                  onCustomHtmlChange?.(newHtml);
                }}
                className='w-full text-sm font-mono text-gray-100 p-4 leading-relaxed bg-transparent border-none outline-none resize-none'
                style={{
                  minHeight: `${Math.max(
                    htmlCode.split("\n").length * 1.5,
                    20
                  )}rem`,
                }}
              />
            ) : (
              <pre className='text-sm font-mono text-gray-100 p-4 leading-relaxed overflow-x-auto'>
                <code className='block'>
                  {htmlCode.split("\n").map((line, index) => (
                    <div key={index} className='py-0.5'>
                      {syntaxHighlight(line)}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Panel */}
      <div className='mt-6 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm'>
        <h4 className='text-sm font-semibold text-gray-200 mb-3 tracking-wide'>
          Instructions:
        </h4>
        <ul className='text-sm text-gray-300 space-y-2'>
          <li className='flex items-start gap-2'>
            <span className='text-blue-400 mt-1'>•</span>
            <span>View the generated HTML code for your resume</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-green-400 mt-1'>•</span>
            <span>Copy and modify the code for custom implementations</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-purple-400 mt-1'>•</span>
            <span>Use standard HTML tags and Tailwind CSS classes</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-orange-400 mt-1'>•</span>
            <span>
              Click &quot;✏️ Edit&quot; to modify the HTML code directly
            </span>
          </li>
        </ul>

        {/* Better Coding Suggestion */}
        <div className='mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg'>
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0'></div>
            <div className='flex-1'>
              <h5 className='text-sm font-semibold text-blue-300 mb-1'>
                💡 Better Coding Tip:
              </h5>
              <p className='text-xs text-blue-200 leading-relaxed'>
                Copy this HTML format and modify it in your preferred code
                editor. The structure uses semantic HTML with Tailwind CSS for
                styling. You can customize colors, layout, and add your own CSS
                classes for a unique design that matches your personal brand.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='mt-4 flex flex-wrap gap-2'>
          <button
            onClick={() => {
              navigator.clipboard.writeText(htmlCode);
              // You could add a toast notification here
            }}
            className='px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-xs text-blue-300 hover:text-blue-200 transition-all duration-200'
          >
            📋 Copy Full Code
          </button>
          <button
            onClick={() => {
              const formatted = htmlCode
                .replace(/></g, ">\n<")
                .replace(/\n\s*\n/g, "\n")
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
                .join("\n");
              setHtmlCode(formatted);
            }}
            className='px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-xs text-green-300 hover:text-green-200 transition-all duration-200'
          >
            🎨 Format Code
          </button>
          <button
            onClick={() => {
              const cleanCode = htmlCode
                .replace(/\s+/g, " ")
                .replace(/>\s+</g, "><")
                .trim();
              setHtmlCode(cleanCode);
            }}
            className='px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-xs text-purple-300 hover:text-purple-200 transition-all duration-200'
          >
            🧹 Minify Code
          </button>
        </div>
      </div>
    </div>
  );
}
