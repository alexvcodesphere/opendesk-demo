'use client';

import { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { ProjectSelector } from './ProjectSelector';
import { User, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onCreateProject: () => void;
  onDeleteProject?: (project: Project) => void;
  userName?: string | null;
  onLogout?: () => void;
}

export function Header({
  projects,
  currentProject,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
  userName,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">O</span>
          </div>
          <span className="text-lg font-bold">OpenApps</span>
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
            onDeleteProject={onDeleteProject}
          />
        </nav>

        {/* Right - User menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Button>
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm hidden sm:inline">{userName || 'User'}</span>
            {onLogout && (
              <Button variant="ghost" size="icon" onClick={onLogout} title="Logout">
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
