'use client';

import { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { ProjectSelector } from './ProjectSelector';
import { User, Settings } from 'lucide-react';

interface HeaderProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onCreateProject: () => void;
}

export function Header({
  projects,
  currentProject,
  onSelectProject,
  onCreateProject,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-lg font-bold text-gray-100">OpenApps</span>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Button
            variant={currentProject === null ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onSelectProject(null)}
          >
            Catalog
          </Button>
          <ProjectSelector
            projects={projects}
            currentProject={currentProject}
            onSelectProject={onSelectProject}
            onCreateProject={onCreateProject}
          />
        </nav>

        {/* Right - User menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-gray-400" />
          </Button>
          <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-300 hidden sm:inline">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
