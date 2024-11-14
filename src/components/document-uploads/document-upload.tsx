'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactSelect from 'react-select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { ReactSelectStyles } from '@/styles/react-select-style';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  category: string;
}

interface Category {
  value: string;
  label: string;
}

const categories: Category[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Work' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
];

const DocumentUploadInput = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        category: selectedCategory?.value || 'uncategorized',
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [selectedCategory]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className='flex flex-col gap-4 w-full max-w-3xl'>
      <div className='text-xl font-bold'>Document Uploads</div>
      <div>
        <Label className='font-medium'>Category</Label>
        <div className='space-y-6 mt-1'>
        <ReactSelect
          options={categories}
          value={selectedCategory}
          onChange={(newValue) => setSelectedCategory(newValue as Category)}
          placeholder='Select a category'
          className='react-select-container'
          styles={ReactSelectStyles}
        />
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        )}
      </div>

      {files.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                <TableCell>{file.category}</TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => deleteFile(file.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DocumentUploadInput;
