'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

const CategoryInput = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory.trim() },
      ]);
      setNewCategory('');
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const updateCategory = () => {
    if (editingCategory && newCategory.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategory.trim() }
            : cat
        )
      );
      setEditingCategory(null);
      setNewCategory('');
    }
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className='max-w-2xl w-full'>
      <div className='font-bold text-lg pb-2'>Category Manager</div>
      <div>
        <div className='flex space-x-2 mb-4'>
          <Input
            type='text'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder='Enter category'
          />
          <Button onClick={editingCategory ? updateCategory : addCategory}>
            {editingCategory ? 'Update' : 'Add'}
          </Button>
        </div>
        {categories.length > 0 && (
          <Card>
            <CardContent className='p-1'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className='text-center'>Edit</TableHead>
                    <TableHead className='text-center'>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell className='text-center'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => startEditing(category)}
                        >
                          <Pencil className='h-4 w-4' />
                          <span className='sr-only'>Edit</span>
                        </Button>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                          <span className='sr-only'>Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CategoryInput;
