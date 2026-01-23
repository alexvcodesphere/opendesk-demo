'use client';

import { useState } from 'react';
import { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, FolderOpen, LayoutGrid } from 'lucide-react';

interface ProjectSelectorProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onCreateProject: () => void;
}

export function ProjectSelector({
  projects,
  currentProject,
  onSelectProject,
  onCreateProject,
}: ProjectSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {currentProject ? (
            <>
              <FolderOpen className="w-4 h-4" />
              {currentProject.name}
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4" />
              App Catalog
            </>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
        <DropdownMenuLabel className="text-gray-400">Projects</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        
        <DropdownMenuItem
          onClick={() => onSelectProject(null)}
          className="cursor-pointer text-gray-100 focus:bg-gray-800 focus:text-gray-100"
        >
          <LayoutGrid className="w-4 h-4 mr-2" />
          App Catalog
        </DropdownMenuItem>
        
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="cursor-pointer text-gray-100 focus:bg-gray-800 focus:text-gray-100"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            {project.name}
            {project.status !== 'active' && (
              <span className="ml-auto text-xs text-yellow-400">
                {project.status}
              </span>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-gray-800" />
        
        <DropdownMenuItem
          onClick={onCreateProject}
          className="cursor-pointer text-violet-400 focus:bg-violet-600/20 focus:text-violet-400"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
