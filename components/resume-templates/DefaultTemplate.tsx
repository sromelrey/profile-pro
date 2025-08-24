"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface DefaultTemplateProps {
  data: ResumeData;
}

export default function DefaultTemplate({ data }: DefaultTemplateProps) {
  const { contact, summary, experience, education, skills, projects } = data;

  return (
    <div className='max-w-4xl mx-auto bg-white shadow-lg p-8 font-sans'>
      {/* Header */}
      <header className='border-b-2 border-gray-300 pb-6 mb-6'>
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>
          {contact.name}
        </h1>
        <div className='text-gray-600 space-y-1'>
          <p>
            {contact.email} • {contact.phone}
          </p>
          <p>{contact.location}</p>
          <div className='flex gap-4 text-sm'>
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                className='text-blue-600 hover:underline'
              >
                LinkedIn
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                className='text-blue-600 hover:underline'
              >
                GitHub
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                className='text-blue-600 hover:underline'
              >
                Website
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1'>
            Professional Summary
          </h2>
          <p className='text-gray-700 leading-relaxed'>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1'>
            Professional Experience
          </h2>
          <div className='space-y-4'>
            {experience.map((exp) => (
              <div key={exp.id} className='border-l-4 border-blue-500 pl-4'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      {exp.position}
                    </h3>
                    <p className='text-gray-600'>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className='text-sm text-gray-500'>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className='text-gray-700 mb-2'>{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className='list-disc list-inside text-gray-700 space-y-1'>
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1'>
            Education
          </h2>
          <div className='space-y-4'>
            {education.map((edu) => (
              <div key={edu.id} className='border-l-4 border-green-500 pl-4'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className='text-gray-600'>{edu.institution}</p>
                    {edu.gpa && (
                      <p className='text-sm text-gray-500'>GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className='text-sm text-gray-500'>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1'>
            Skills
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            {skills.map((skill) => (
              <div key={skill.id} className='flex justify-between items-center'>
                <span className='font-medium text-gray-700'>{skill.name}</span>
                <span className='text-sm text-gray-500 capitalize'>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1'>
            Projects
          </h2>
          <div className='space-y-4'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='border-l-4 border-purple-500 pl-4'
              >
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='font-semibold text-gray-800'>
                    {project.name}
                  </h3>
                  <div className='flex gap-2'>
                    {project.link && (
                      <a
                        href={project.link}
                        className='text-blue-600 hover:underline text-sm'
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className='text-blue-600 hover:underline text-sm'
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <p className='text-gray-700 mb-2'>{project.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
