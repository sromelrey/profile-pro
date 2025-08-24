"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface PDFTemplateProps {
  data: ResumeData;
}

export default function PDFTemplate({ data }: PDFTemplateProps) {
  const { contact, summary, experience, education, skills, projects } = data;

  return (
    <div
      className='max-w-4xl mx-auto bg-white p-8 font-sans'
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.4",
      }}
    >
      {/* Header */}
      <header
        className='border-b-2 pb-6 mb-6'
        style={{ borderBottom: "2px solid #d1d5db" }}
      >
        <h1
          className='text-4xl font-bold mb-2'
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          {contact.name}
        </h1>
        <div style={{ color: "#6b7280" }}>
          <p style={{ margin: "4px 0" }}>
            {contact.email} • {contact.phone}
          </p>
          <p style={{ margin: "4px 0" }}>{contact.location}</p>
          {(contact.linkedin || contact.github || contact.website) && (
            <div
              style={{
                display: "flex",
                gap: "16px",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  LinkedIn
                </a>
              )}
              {contact.github && (
                <a
                  href={contact.github}
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  GitHub
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className='mb-6'>
          <h2
            className='text-xl font-semibold mb-3 border-b pb-1'
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "12px",
              borderBottom: "1px solid #d1d5db",
              paddingBottom: "4px",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ color: "#374151", lineHeight: "1.6" }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className='mb-6'>
          <h2
            className='text-xl font-semibold mb-4 border-b pb-1'
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
              borderBottom: "1px solid #d1d5db",
              paddingBottom: "4px",
            }}
          >
            Professional Experience
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  borderLeft: "4px solid #3b82f6",
                  paddingLeft: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <h3
                      className='font-semibold'
                      style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "16px",
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p style={{ color: "#374151", marginBottom: "8px" }}>
                  {exp.description}
                </p>
                {exp.achievements.length > 0 && (
                  <ul style={{ color: "#374151", paddingLeft: "20px" }}>
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} style={{ marginBottom: "4px" }}>
                        {achievement}
                      </li>
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
          <h2
            className='text-xl font-semibold mb-4 border-b pb-1'
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
              borderBottom: "1px solid #d1d5db",
              paddingBottom: "4px",
            }}
          >
            Education
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  borderLeft: "4px solid #10b981",
                  paddingLeft: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3
                      className='font-semibold'
                      style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "16px",
                      }}
                    >
                      {edu.degree} in {edu.field}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: "14px", color: "#6b7280" }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
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
          <h2
            className='text-xl font-semibold mb-4 border-b pb-1'
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
              borderBottom: "1px solid #d1d5db",
              paddingBottom: "4px",
            }}
          >
            Skills
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "500", color: "#374151" }}>
                  {skill.name}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    textTransform: "capitalize",
                  }}
                >
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
          <h2
            className='text-xl font-semibold mb-4 border-b pb-1'
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
              borderBottom: "1px solid #d1d5db",
              paddingBottom: "4px",
            }}
          >
            Projects
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  borderLeft: "4px solid #8b5cf6",
                  paddingLeft: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    className='font-semibold'
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "16px",
                    }}
                  >
                    {project.name}
                  </h3>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {project.link && (
                      <a
                        href={project.link}
                        style={{
                          color: "#3b82f6",
                          textDecoration: "underline",
                          fontSize: "14px",
                        }}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        style={{
                          color: "#3b82f6",
                          textDecoration: "underline",
                          fontSize: "14px",
                        }}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <p style={{ color: "#374151", marginBottom: "8px" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        fontSize: "12px",
                        borderRadius: "4px",
                      }}
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
