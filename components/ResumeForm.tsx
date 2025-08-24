/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  ResumeData,
  ContactInfo,
  Experience,
  Education,
  Skill,
  Project,
} from "@/types/resume";
import { generateId } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onDataChange }: ResumeFormProps) {
  const updateData = (updates: Partial<ResumeData>) => {
    onDataChange({ ...data, ...updates });
  };

  const updateContact = (updates: Partial<ContactInfo>) => {
    updateData({ contact: { ...data.contact, ...updates } });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    };
    updateData({ experience: [...data.experience, newExperience] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    const updatedExperience = data.experience.map((exp) =>
      exp.id === id ? { ...exp, ...updates } : exp
    );
    updateData({ experience: updatedExperience });
  };

  const removeExperience = (id: string) => {
    updateData({ experience: data.experience.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    updateData({ education: [...data.education, newEducation] });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    const updatedEducation = data.education.map((edu) =>
      edu.id === id ? { ...edu, ...updates } : edu
    );
    updateData({ education: updatedEducation });
  };

  const removeEducation = (id: string) => {
    updateData({ education: data.education.filter((edu) => edu.id !== id) });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: "",
      level: "intermediate",
    };
    updateData({ skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    const updatedSkills = data.skills.map((skill) =>
      skill.id === id ? { ...skill, ...updates } : skill
    );
    updateData({ skills: updatedSkills });
  };

  const removeSkill = (id: string) => {
    updateData({ skills: data.skills.filter((skill) => skill.id !== id) });
  };

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: "",
      description: "",
      technologies: [""],
    };
    updateData({ projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = data.projects.map((project) =>
      project.id === id ? { ...project, ...updates } : project
    );
    updateData({ projects: updatedProjects });
  };

  const removeProject = (id: string) => {
    updateData({
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  return (
    <div className='bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl'>
      <Tabs.Root defaultValue='contact' className='w-full'>
        <Tabs.List className='flex space-x-2 bg-gray-800/50 p-2 rounded-xl mb-8 border border-gray-700/50'>
          <Tabs.Trigger
            value='contact'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Contact
          </Tabs.Trigger>
          <Tabs.Trigger
            value='summary'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Summary
          </Tabs.Trigger>
          <Tabs.Trigger
            value='experience'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Experience
          </Tabs.Trigger>
          <Tabs.Trigger
            value='education'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Education
          </Tabs.Trigger>
          <Tabs.Trigger
            value='skills'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Skills
          </Tabs.Trigger>
          <Tabs.Trigger
            value='projects'
            className='flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 data-[state=inactive]:hover:bg-gray-700/50'
          >
            Projects
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value='contact' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                Full Name
              </Label.Root>
              <input
                type='text'
                value={data.contact.name}
                onChange={(e) => updateContact({ name: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='John Doe'
              />
            </div>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                Email
              </Label.Root>
              <input
                type='email'
                value={data.contact.email}
                onChange={(e) => updateContact({ email: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='john@example.com'
              />
            </div>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                Phone
              </Label.Root>
              <input
                type='tel'
                value={data.contact.phone}
                onChange={(e) => updateContact({ phone: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='+1 (555) 123-4567'
              />
            </div>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                Location
              </Label.Root>
              <input
                type='text'
                value={data.contact.location}
                onChange={(e) => updateContact({ location: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='Cebu City, Philippines'
              />
            </div>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                LinkedIn
              </Label.Root>
              <input
                type='url'
                value={data.contact.linkedin || ""}
                onChange={(e) => updateContact({ linkedin: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='https://linkedin.com/in/johndoe'
              />
            </div>
            <div className='space-y-2'>
              <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                GitHub
              </Label.Root>
              <input
                type='url'
                value={data.contact.github || ""}
                onChange={(e) => updateContact({ github: e.target.value })}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                placeholder='https://github.com/johndoe'
              />
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value='summary' className='space-y-6'>
          <div className='space-y-3'>
            <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
              Professional Summary
            </Label.Root>
            <textarea
              value={data.summary}
              onChange={(e) => updateData({ summary: e.target.value })}
              rows={8}
              className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm resize-none'
              placeholder='Write a compelling summary of your professional background, achievements, and career objectives...'
            />
          </div>
        </Tabs.Content>

        <Tabs.Content value='experience' className='space-y-6'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold text-gray-100 tracking-wide'>
              Work Experience
            </h3>
            <button
              onClick={addExperience}
              className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <Plus size={16} />
              Add Experience
            </button>
          </div>
          <div className='space-y-6'>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className='bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm'
              >
                <div className='flex justify-between items-start mb-6'>
                  <h4 className='font-semibold text-gray-100 text-lg'>
                    Experience Entry
                  </h4>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className='text-red-400 hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-500/10 rounded-lg'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Position
                    </Label.Root>
                    <input
                      type='text'
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, { position: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='Software Engineer'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Company
                    </Label.Root>
                    <input
                      type='text'
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='Tech Corp'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Location
                    </Label.Root>
                    <input
                      type='text'
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, { location: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='Cebu City, Philippines'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Start Date
                    </Label.Root>
                    <input
                      type='date'
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { startDate: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      End Date
                    </Label.Root>
                    <input
                      type='date'
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { endDate: e.target.value })
                      }
                      disabled={exp.current}
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm disabled:bg-gray-700/30 disabled:text-gray-500'
                    />
                  </div>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, { current: e.target.checked })
                      }
                      className='w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2'
                    />
                    <Label.Root className='text-sm font-medium text-gray-200'>
                      Current Position
                    </Label.Root>
                  </div>
                </div>
                <div className='mt-6'>
                  <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                    Description
                  </Label.Root>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, { description: e.target.value })
                    }
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm resize-none'
                    placeholder='Describe your role, responsibilities, and key achievements...'
                  />
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value='education' className='space-y-6'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold text-gray-100 tracking-wide'>
              Education
            </h3>
            <button
              onClick={addEducation}
              className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
          <div className='space-y-6'>
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className='bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm'
              >
                <div className='flex justify-between items-start mb-6'>
                  <h4 className='font-semibold text-gray-100 text-lg'>
                    Education Entry
                  </h4>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className='text-red-400 hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-500/10 rounded-lg'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Institution
                    </Label.Root>
                    <input
                      type='text'
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, { institution: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='University of California'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Degree
                    </Label.Root>
                    <input
                      type='text'
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder="Bachelor's"
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Field of Study
                    </Label.Root>
                    <input
                      type='text'
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, { field: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='Computer Science'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      GPA
                    </Label.Root>
                    <input
                      type='text'
                      value={edu.gpa || ""}
                      onChange={(e) =>
                        updateEducation(edu.id, { gpa: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='3.8'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Start Date
                    </Label.Root>
                    <input
                      type='date'
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { startDate: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      End Date
                    </Label.Root>
                    <input
                      type='date'
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { endDate: e.target.value })
                      }
                      disabled={edu.current}
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 backdrop-blur-sm disabled:bg-gray-700/30 disabled:text-gray-500'
                    />
                  </div>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      checked={edu.current}
                      onChange={(e) =>
                        updateEducation(edu.id, { current: e.target.checked })
                      }
                      className='w-4 h-4 text-green-600 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2'
                    />
                    <Label.Root className='text-sm font-medium text-gray-200'>
                      Currently Studying
                    </Label.Root>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value='skills' className='space-y-6'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold text-gray-100 tracking-wide'>
              Skills
            </h3>
            <button
              onClick={addSkill}
              className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <Plus size={16} />
              Add Skill
            </button>
          </div>
          <div className='space-y-4'>
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className='flex items-center gap-4 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm'
              >
                <div className='flex-1'>
                  <input
                    type='text'
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(skill.id, { name: e.target.value })
                    }
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm'
                    placeholder='JavaScript'
                  />
                </div>
                <Select.Root
                  value={skill.level}
                  onValueChange={(value) =>
                    updateSkill(skill.id, { level: value as any })
                  }
                >
                  <Select.Trigger className='flex items-center justify-between w-36 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm'>
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown size={16} className='text-gray-400' />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className='bg-gray-800 border border-gray-700 rounded-xl shadow-2xl'>
                      <Select.Viewport className='p-2'>
                        <Select.Item
                          value='beginner'
                          className='px-4 py-3 hover:bg-gray-700/50 cursor-pointer rounded-lg text-gray-100 transition-colors duration-200'
                        >
                          <Select.ItemText>Beginner</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value='intermediate'
                          className='px-4 py-3 hover:bg-gray-700/50 cursor-pointer rounded-lg text-gray-100 transition-colors duration-200'
                        >
                          <Select.ItemText>Intermediate</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value='advanced'
                          className='px-4 py-3 hover:bg-gray-700/50 cursor-pointer rounded-lg text-gray-100 transition-colors duration-200'
                        >
                          <Select.ItemText>Advanced</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value='expert'
                          className='px-4 py-3 hover:bg-gray-700/50 cursor-pointer rounded-lg text-gray-100 transition-colors duration-200'
                        >
                          <Select.ItemText>Expert</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className='text-red-400 hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-500/10 rounded-lg'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value='projects' className='space-y-6'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold text-gray-100 tracking-wide'>
              Projects
            </h3>
            <button
              onClick={addProject}
              className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
          <div className='space-y-6'>
            {data.projects.map((project) => (
              <div
                key={project.id}
                className='bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm'
              >
                <div className='flex justify-between items-start mb-6'>
                  <h4 className='font-semibold text-gray-100 text-lg'>
                    Project Entry
                  </h4>
                  <button
                    onClick={() => removeProject(project.id)}
                    className='text-red-400 hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-500/10 rounded-lg'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Project Name
                    </Label.Root>
                    <input
                      type='text'
                      value={project.name}
                      onChange={(e) =>
                        updateProject(project.id, { name: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='E-commerce Platform'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      Live Demo URL
                    </Label.Root>
                    <input
                      type='url'
                      value={project.link || ""}
                      onChange={(e) =>
                        updateProject(project.id, { link: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='https://example.com'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                      GitHub URL
                    </Label.Root>
                    <input
                      type='url'
                      value={project.github || ""}
                      onChange={(e) =>
                        updateProject(project.id, { github: e.target.value })
                      }
                      className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 backdrop-blur-sm'
                      placeholder='https://github.com/user/repo'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                    Description
                  </Label.Root>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, { description: e.target.value })
                    }
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 backdrop-blur-sm resize-none'
                    placeholder='Describe your project, its features, and the problems it solves...'
                  />
                </div>
                <div className='mt-6'>
                  <Label.Root className='block text-sm font-semibold text-gray-200 mb-2 tracking-wide'>
                    Technologies (comma-separated)
                  </Label.Root>
                  <input
                    type='text'
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(project.id, {
                        technologies: e.target.value
                          .split(",")
                          .map((tech) => tech.trim())
                          .filter(Boolean),
                      })
                    }
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 backdrop-blur-sm'
                    placeholder='React, Node.js, MongoDB, TypeScript, Tailwind CSS'
                  />
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
