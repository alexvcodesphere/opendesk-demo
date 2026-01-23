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
  projects, currentProject, onSelectProject, onCreateProject,
}: ProjectSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {currentProject ? (<><FolderOpen className="w-4 h-4" />{currentProject.name}</>) : (<><LayoutGrid className="w-4 h-4" />App Catalog</>)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-muted-foreground">Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelectProject(null)} className="cursor-pointer">
          <LayoutGrid className="w-4 h-4 mr-2" /> App Catalog
        </DropdownMenuItem>
        {projects.map((project) => (
          <DropdownMenuItem key={project.id} onClick={() => onSelectProject(project)} className="cursor-pointer">
            <FolderOpen className="w-4 h-4 mr-2" /> {project.name}
            {project.status !== 'active' && (<span className="ml-auto text-xs text-muted-foreground">{project.status}</span>)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCreateProject} className="cursor-pointer text-primary">
          <Plus className="w-4 h-4 mr-2" /> Create Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
