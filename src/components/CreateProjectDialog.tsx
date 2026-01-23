'use client';

import { useState } from 'react';
import { ServiceProvider } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2, AlertCircle } from 'lucide-react';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledProviders: ServiceProvider[];
  onCreateProject: (name: string) => Promise<{ success: boolean; errors?: string[] }>;
}

type DialogStep = 'input' | 'creating' | 'success' | 'error';

export function CreateProjectDialog({
  open,
  onOpenChange,
  enabledProviders,
  onCreateProject,
}: CreateProjectDialogProps) {
  const [projectName, setProjectName] = useState('');
  const [step, setStep] = useState<DialogStep>('input');
  const [errors, setErrors] = useState<string[]>([]);

  const handleCreate = async () => {
    if (!projectName.trim()) return;

    setStep('creating');
    
    const result = await onCreateProject(projectName.trim());
    
    if (result.success) {
      setStep('success');
    } else {
      setErrors(result.errors || ['An unknown error occurred']);
      setStep('error');
    }
  };

  const handleClose = () => {
    setStep('input');
    setProjectName('');
    setErrors([]);
    onOpenChange(false);
  };

  const handleStayHere = () => {
    handleClose();
  };

  const handleGoToProject = () => {
    handleClose();
    // Note: Navigation will be handled by parent component
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'input' && (
          <>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter a name for your project. {enabledProviders.length} application
                {enabledProviders.length !== 1 ? 's' : ''} will be deployed.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Input
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
              />

              {/* Show enabled apps */}
              <div className="mt-4 flex flex-wrap gap-2">
                {enabledProviders.map((provider) => (
                  <div
                    key={provider.name}
                    className="flex items-center gap-2 px-2 py-1 rounded bg-gray-800 text-sm text-gray-300"
                  >
                    {provider.iconUrl ? (
                      <img
                        src={provider.iconUrl}
                        alt=""
                        className="w-4 h-4 rounded"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded bg-violet-600 flex items-center justify-center text-[10px] text-white font-bold">
                        {provider.displayName.charAt(0)}
                      </div>
                    )}
                    {provider.displayName}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!projectName.trim()}
              >
                Create Project
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'creating' && (
          <div className="py-12 text-center">
            <Loader2 className="w-12 h-12 mx-auto text-violet-500 animate-spin" />
            <p className="mt-4 text-gray-300">Creating project...</p>
            <p className="text-sm text-gray-500">
              Deploying {enabledProviders.length} application
              {enabledProviders.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-600/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-100">
              Project Created!
            </h3>
            <p className="mt-2 text-gray-400">
              Your project &quot;{projectName}&quot; has been created successfully with{' '}
              <span className="text-violet-400 font-medium">
                {enabledProviders.length} application
                {enabledProviders.length !== 1 ? 's' : ''}
              </span>
              .
            </p>

            <div className="mt-6 flex gap-3 justify-center">
              <Button variant="outline" onClick={handleStayHere}>
                Stay Here
              </Button>
              <Button onClick={handleGoToProject}>
                Go to Project
              </Button>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-600/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-100">
              Deployment Failed
            </h3>
            <div className="mt-2 text-sm text-gray-400 max-h-32 overflow-auto">
              {errors.map((err, i) => (
                <p key={i} className="text-red-400">
                  {err}
                </p>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
