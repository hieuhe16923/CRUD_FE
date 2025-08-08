/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-use-before-define */
// components/PetForm.tsx
import React, { useState, useEffect, useCallback } from 'react';
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';
import RadioGroup from './RadioGroup';
import ActionButtons from './ActionButtons';
import Toast from './Toast';
import { Pet, PetFormValues, SelectOption } from '../types';
import { petService } from '../services/petService';

interface PetFormProps {
  formType: 'add' | 'update';
  initialPetData?: Pet;
  onSuccess?: () => void;
}

const PetForm: React.FC<PetFormProps> = ({
  formType,
  initialPetData,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<PetFormValues>({
    id: initialPetData?.id || '',
    petName: initialPetData?.name || '',
    categoryId: initialPetData?.category?.id || '',
    categoryName: initialPetData?.category?.name || '',
    photoUrls: initialPetData?.photoUrls.join(', ') || '',
    tags: initialPetData?.tags?.map(tag => tag.name).join(', ') || '',
    status: initialPetData?.status || 'available',
  });

  const [errors, setErrors] = useState<Partial<PetFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    if (formType === 'update' && initialPetData) {
      // Find the category option that matches the initial pet data's category ID
      const matchedCategory = categoryOptions.find(
        opt => opt.value === initialPetData.category?.id
      );
      setFormData({
        id: initialPetData.id || '',
        petName: initialPetData.name || '',
        categoryId: matchedCategory ? Number(matchedCategory.value) : '', // Use matched ID or empty
        categoryName: matchedCategory
          ? matchedCategory.label
          : initialPetData.category?.name || '', // Use matched label or API name
        photoUrls: initialPetData.photoUrls.join(', ') || '',
        tags: initialPetData.tags?.map(tag => tag.name).join(', ') || '',
        status: initialPetData.status || 'available',
      });
      setErrors({});
    }
  }, [formType, initialPetData]);

  const validate = useCallback(() => {
    const newErrors: Partial<PetFormValues> = {};
    if (!formData.petName.trim()) {
      newErrors.petName = 'Pet name cannot be empty.'; // Updated error message
    }
    if (!formData.categoryId && !formData.categoryName.trim()) {
      newErrors.categoryName = 'Please select or enter a category name.'; // Updated error message
    }
    if (!formData.photoUrls.trim()) {
      newErrors.photoUrls = 'Please provide at least one photo URL.'; // Updated error message
    } else {
      const urls = formData.photoUrls
        .split(',')
        .map(url => url.trim())
        .filter(Boolean);
      const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
      if (urls.some(url => !urlRegex.test(url))) {
        newErrors.photoUrls = 'Some photo URLs are invalid.'; // Updated error message
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof PetFormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStatusChange = (status: 'available' | 'pending' | 'sold') => {
    setFormData(prev => ({
      ...prev,
      status,
    }));
  };

  const convertFormDataToPetObject = (): Pet => {
    const photoUrlsArray = formData.photoUrls
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
      .map((name, index) => ({
        id: index,
        name,
      }));

    const petObject: Pet = {
      name: formData.petName,
      photoUrls: photoUrlsArray,
      status: formData.status,
    };

    let categoryNameToSend: string = 'Unknown';
    if (formData.categoryId) {
      const selectedOption = categoryOptions.find(
        opt => opt.value === formData.categoryId
      );
      categoryNameToSend =
        selectedOption?.apiName || selectedOption?.label || 'Unknown';
    } else if (formData.categoryName) {
      categoryNameToSend = formData.categoryName;
    }

    petObject.category = {
      id: formData.categoryId
        ? Number(formData.categoryId)
        : Math.floor(Math.random() * 100000),
      name: categoryNameToSend,
    };

    if (tagsArray.length > 0) {
      petObject.tags = tagsArray;
    }

    if (formType === 'update' && formData.id) {
      petObject.id = Number(formData.id);
    }

    return petObject;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setToast({
        message: 'Please fill in all required fields correctly.',
        type: 'error',
      }); // Updated toast message
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    const petData = convertFormDataToPetObject();

    const maxRetries = 5;
    let currentRetry = 0;

    while (currentRetry < maxRetries) {
      try {
        let result;
        if (formType === 'add') {
          result = await petService.addPet(petData);
        } else {
          result = await petService.updatePet(petData);
        }

        console.log('Operation successful:', result);
        setToast({
          message: `Pet ${
            formType === 'add' ? 'added' : 'updated'
          } successfully!`,
          type: 'success',
        }); // Updated toast message

        if (formType === 'add') {
          handleCancel();
        }
        onSuccess && onSuccess();
        break;
      } catch (error: any) {
        console.error('Error submitting form:', error);
        currentRetry++;
        if (currentRetry < maxRetries) {
          const delay = Math.pow(2, currentRetry) * 1000;
          console.log(
            `Retrying in ${delay / 1000} seconds... (Attempt ${
              currentRetry + 1
            }/${maxRetries})`
          );
          await new Promise(res => setTimeout(res, delay));
        } else {
          setToast({
            message: `Error ${
              formType === 'add' ? 'adding' : 'updating'
            } pet: ${error.message || 'Please try again.'}`,
            type: 'error',
          }); // Updated toast message
        }
      } finally {
        if (
          currentRetry >= maxRetries ||
          (currentRetry < maxRetries && toast?.type === 'success')
        ) {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      petName: '',
      categoryId: '',
      categoryName: '',
      photoUrls: '',
      tags: '',
      status: 'available',
    });
    setErrors({});
    setToast(null);
  };

  const categoryOptions: SelectOption[] = [
    { value: 1, label: 'Dogs', apiName: 'Dogs' }, // Changed label to English
    { value: 2, label: 'Cats', apiName: 'Cats' }, // Changed label to English
    { value: 3, label: 'Birds', apiName: 'Birds' }, // Changed label to English
    { value: 4, label: 'Fish', apiName: 'Fish' }, // Changed label to English
    { value: 5, label: 'Rabbits', apiName: 'Rabbits' }, // Changed label to English
    { value: 6, label: 'Hamsters', apiName: 'Hamsters' }, // Changed label to English
    { value: 7, label: 'Other', apiName: 'Other' }, // Changed label to English
  ];

  const statusOptions: SelectOption[] = [
    { value: 'available', label: 'Available' }, // Changed label to English
    { value: 'pending', label: 'Pending' }, // Changed label to English
    { value: 'sold', label: 'Sold' }, // Changed label to English
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {formType === 'add' ? 'Add New Pet' : 'Update Pet Information'}{' '}
          {/* Updated title */}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {formType === 'update' && (
            <InputGroup
              label="Pet ID" // Updated label
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              type="number"
              readOnly={true}
            />
          )}

          <InputGroup
            label="Pet Name" // Updated label
            name="petName"
            value={formData.petName}
            onChange={handleInputChange}
            placeholder="e.g., Kitty, Puppy" // Updated placeholder
            error={errors.petName}
          />

          <SelectGroup
            label="Category" // Updated label
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            options={categoryOptions}
            error={
              errors.categoryId
                ? String(errors.categoryId)
                : errors.categoryName
            }
          />
          {formData.categoryId === 7 || !formData.categoryId ? (
            <InputGroup
              label="Custom Category Name" // Updated label
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              placeholder="Enter new category name (e.g., Ferrets)" // Updated placeholder
              error={errors.categoryName}
            />
          ) : null}

          <InputGroup
            label="Photo URLs" // Updated label
            name="photoUrls"
            value={formData.photoUrls}
            onChange={handleInputChange}
            rows={3}
            placeholder="Paste image URLs here (one URL per line, or comma-separated)" // Updated placeholder
            error={errors.photoUrls}
          />

          <InputGroup
            label="Tags" // Updated label
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Add relevant tags (e.g., cute, smart, comma-separated)" // Updated placeholder
          />

          <RadioGroup
            label="Status" // Updated label
            name="status"
            selectedValue={formData.status}
            onChange={handleStatusChange as (value: string) => void}
            options={statusOptions}
          />

          <ActionButtons
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitText={formType === 'add' ? 'Add Pet' : 'Update Pet'} // Updated button text
          />
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default PetForm;
