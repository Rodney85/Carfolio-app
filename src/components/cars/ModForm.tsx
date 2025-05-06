import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { ModCategory } from '../../types/car';
import { Button } from '../shared/Button';
import { X, Plus } from 'lucide-react';

interface ModFormProps {
  carId: Id<'cars'>;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: {
    id?: Id<'mods'>;
    title: string;
    brand?: string;
    category: ModCategory;
    description?: string;
    link?: string;
    price?: number;
  };
  isEditing?: boolean;
}

export const ModForm: React.FC<ModFormProps> = ({
  carId,
  onSuccess,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    brand: initialData?.brand || '',
    category: initialData?.category || 'Engine' as ModCategory,
    description: initialData?.description || '',
    link: initialData?.link || '',
    price: initialData?.price || undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMod = useMutation(api.mods.createMod);
  const updateMod = useMutation(api.mods.updateMod);

  const categories: ModCategory[] = [
    'Engine',
    'Suspension',
    'Wheels',
    'Exterior',
    'Interior',
    'Electronics',
    'Other',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    if (
      formData.link &&
      !formData.link.startsWith('http://') &&
      !formData.link.startsWith('https://')
    ) {
      newErrors.link = 'Link must be a valid URL starting with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && initialData?.id) {
        await updateMod({
          modId: initialData.id,
          title: formData.title,
          brand: formData.brand || undefined,
          category: formData.category,
          description: formData.description || undefined,
          link: formData.link || undefined,
          price: formData.price,
        });
        toast.success('Mod updated successfully');
      } else {
        await createMod({
          carId,
          title: formData.title,
          brand: formData.brand || undefined,
          category: formData.category,
          description: formData.description || undefined,
          link: formData.link || undefined,
          price: formData.price,
        });
        toast.success('Mod added successfully');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving mod:', error);
      toast.error('Failed to save mod');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {isEditing ? 'Edit Modification' : 'Add Modification'}
        </h3>
        {onCancel && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
            placeholder="e.g., Garrett GTX3584RS Turbo"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="brand" className="block text-sm font-medium">
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
            placeholder="e.g., Garrett"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
            placeholder="e.g., 1299.99"
            min="0"
            step="0.01"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
          placeholder="Add details about this modification..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="link" className="block text-sm font-medium">
          Affiliate Link
        </label>
        <input
          id="link"
          name="link"
          type="url"
          value={formData.link}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700"
          placeholder="https://example.com/product"
        />
        {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} leftIcon={isSubmitting ? undefined : <Plus className="h-4 w-4" />}>
          {isSubmitting
            ? 'Saving...'
            : isEditing
            ? 'Update Mod'
            : 'Add Mod'}
        </Button>
      </div>
    </form>
  );
};
