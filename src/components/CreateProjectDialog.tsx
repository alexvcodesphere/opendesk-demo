'use client';

import { useState } from 'react';
import { ServiceProvider } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2, AlertCircle } from 'lucide-react';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledProviders: ServiceProvider[];
  onCreateProject: (name: string) => Promise<{ success: boolean; errors?: string[]; projectId?: string }>;
  onGoToProject?: (projectId: string) => void;
}

type DialogStep = 'input' | 'creating' | 'success' | 'error';

export function CreateProjectDialog({ open, onOpenChange, enabledProviders, onCreateProject, onGoToProject }: CreateProjectDialogProps) {
  const [projectName, setProjectName] = useState('');
  const [step, setStep] = useState<DialogStep>('input');
  const [errors, setErrors] = useState<string[]>([]);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    setStep('creating');
    const result = await onCreateProject(projectName.trim());
    if (result.success) {
      setCreatedProjectId(result.projectId || null);
      setStep('success');
    } else {
      setErrors(result.errors || ['An unknown error occurred']);
      setStep('error');
    }
  };

  const handleClose = () => { setStep('input'); setProjectName(''); setErrors([]); setCreatedProjectId(null); onOpenChange(false); };

  const handleGoToProject = () => {
    if (createdProjectId && onGoToProject) {
      onGoToProject(createdProjectId);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'input' && (
          <>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Enter a name for your project. {enabledProviders.length === 0 ? 'You can add applications later.' : `${enabledProviders.length} application${enabledProviders.length !== 1 ? 's' : ''} will be deployed.`}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input placeholder="Enter project name..." value={projectName} onChange={(e) => setProjectName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreate()} autoFocus />
              <div className="mt-4 flex flex-wrap gap-2">
                {enabledProviders.map((provider) => (
                  <div key={provider.name} className="flex items-center gap-2 px-2 py-1 rounded bg-muted text-sm">
                    <div className="w-5 h-5 rounded overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                      {provider.iconUrl ? (
                        <img src={provider.iconUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-primary font-bold">{provider.displayName.charAt(0)}</span>
                      )}
                    </div>
                    {provider.displayName}
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter><Button variant="outline" onClick={handleClose}>Cancel</Button><Button onClick={handleCreate} disabled={!projectName.trim()}>Create Project</Button></DialogFooter>
          </>
        )}
        {step === 'creating' && (<div className="py-12 text-center"><Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" /><p className="mt-4">Creating project...</p>{enabledProviders.length > 0 && <p className="text-sm text-muted-foreground">Deploying {enabledProviders.length} application{enabledProviders.length !== 1 ? 's' : ''}</p>}</div>)}
        {step === 'success' && (<div className="py-8 text-center"><div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center"><Check className="w-8 h-8 text-success" /></div><h3 className="mt-4 text-xl font-semibold">Project Created!</h3><p className="mt-2 text-muted-foreground">Your project &quot;{projectName}&quot; has been created{enabledProviders.length > 0 ? <> with <span className="text-primary font-medium">{enabledProviders.length} application{enabledProviders.length !== 1 ? 's' : ''}</span></> : <>. You can add applications from the project dashboard.</>}.</p><div className="mt-6 flex gap-3 justify-center"><Button variant="outline" onClick={handleClose}>Stay Here</Button><Button onClick={handleGoToProject}>Go to Project</Button></div></div>)}
        {step === 'error' && (<div className="py-8 text-center"><div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center"><AlertCircle className="w-8 h-8 text-destructive" /></div><h3 className="mt-4 text-xl font-semibold">Deployment Failed</h3><div className="mt-2 text-sm max-h-32 overflow-auto">{errors.map((err, i) => (<p key={i} className="text-destructive">{err}</p>))}</div><div className="mt-6"><Button variant="outline" onClick={handleClose}>Close</Button></div></div>)}
      </DialogContent>
    </Dialog>
  );
}
