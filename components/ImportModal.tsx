'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ImportModal({ open, onClose }: ImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('success');
          toast.success('File uploaded successfully!');
          setTimeout(() => {
            onClose();
            setSelectedFile(null);
            setUploadProgress(0);
            setUploadStatus('idle');
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    if (!isUploading) {
      onClose();
      setSelectedFile(null);
      setUploadProgress(0);
      setUploadStatus('idle');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Trend Data
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Select File</Label>
            <div className="mt-2">
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: CSV, Excel (.xlsx, .xls) • Max size: 10MB
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="p-3 border rounded-lg bg-accent/50">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {uploadStatus === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {uploadStatus === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Processing file and extracting trend data...
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-pulse" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Supported data:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>Hashtag performance data</li>
              <li>Social media metrics</li>
              <li>Engagement statistics</li>
              <li>Trend analysis reports</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}