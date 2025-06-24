// components/ImportModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function ImportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file import logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import Trend Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
          <Button onClick={onClose} variant="outline">
            <Upload className="h-4 w-4 mr-2" /> Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
