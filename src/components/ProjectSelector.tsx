'use client';

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
import { ChevronDown, Plus, FolderOpen, LayoutGrid, Trash2 } from 'lucide-react';

interface ProjectSelectorProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onCreateProject: () => void;
  onDeleteProject?: (project: Project) => void;
}

export function ProjectSelector({
  projects, currentProject, onSelectProject, onCreateProject, onDeleteProject,
}: ProjectSelectorProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {currentProject ? (<><FolderOpen className="w-4 h-4" />{currentProject.name}</>) : (<><LayoutGrid className="w-4 h-4" />App Catalog</>)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={4}>
        <DropdownMenuLabel className="text-muted-foreground">Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelectProject(null)} className="cursor-pointer">
          <LayoutGrid className="w-4 h-4 mr-2" /> App Catalog
        </DropdownMenuItem>
        {projects.map((project) => (
          <DropdownMenuItem key={project.id} className="cursor-pointer flex items-center justify-between group">
            <div className="flex items-center flex-1" onClick={() => onSelectProject(project)}>
              <FolderOpen className="w-4 h-4 mr-2" /> {project.name}
              {project.status !== 'active' && (<span className="ml-2 text-xs text-muted-foreground">{project.status}</span>)}
            </div>
            {onDeleteProject && (
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteProject(project); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-opacity"
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </button>
            )}
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
