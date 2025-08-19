// components/PetForm.tsx
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-use-before-define */
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
    photoUrls: initialPetData?.photoUrls?.join(', ') || '',
    tags: initialPetData?.tags?.map(tag => tag.name).join(', ') || '',
    status: initialPetData?.status || 'available',
  });

  const [errors, setErrors] = useState<Partial<PetFormValues>>({});
  const [idError, setIdError] = useState<string | null>(null); // 💡 State mới để quản lý lỗi ID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const fetchedCategories = await petService.getCategories();
        const categoryOptions = fetchedCategories.map(cat => ({
          value: String(cat.id),
          label: cat.name,
          apiName: cat.name,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setToast({
          message: 'Failed to load categories. Please try again.',
          type: 'error',
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (formType === 'update' && initialPetData) {
      const matchedCategory = categories.find(
        opt => Number(opt.value) === initialPetData.category?.id
      );
      setFormData({
        id: initialPetData.id || '',
        petName: initialPetData.name || '',
        categoryId: matchedCategory ? Number(matchedCategory.value) : '',
        categoryName: matchedCategory
          ? matchedCategory.label
          : initialPetData.category?.name || '',
        photoUrls: initialPetData.photoUrls?.join(', ') || '',
        tags: initialPetData.tags?.map(tag => tag.name).join(', ') || '',
        status: initialPetData.status || 'available',
      });
      setErrors({});
    }
  }, [formType, initialPetData, categories]);

  const validate = useCallback(() => {
    const newErrors: Partial<PetFormValues> = {};
    if (!formData.petName.trim()) {
      newErrors.petName = 'Pet name cannot be empty.';
    }
    if (!formData.categoryId && !formData.categoryName.trim()) {
      newErrors.categoryName = 'Please select or enter a category name.';
    }
    if (!formData.photoUrls.trim()) {
      newErrors.photoUrls = 'Please provide at least one photo URL.';
    } else {
      const urls = formData.photoUrls
        .split(',')
        .map(url => url.trim())
        .filter(Boolean);
      const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
      if (urls.some(url => !urlRegex.test(url))) {
        newErrors.photoUrls = 'Some photo URLs are invalid.';
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
    if (name === 'id') {
      setIdError(null); // 💡 Xóa lỗi ID khi người dùng thay đổi giá trị
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

    if (formType === 'add') {
      petObject.id = Math.floor(Math.random() * 1000000000);
    } else if (formType === 'update' && initialPetData?.id) {
      petObject.id = initialPetData.id;
    }

    let categoryNameToSend: string = 'Unknown';
    if (formData.categoryId) {
      const selectedOption = categories.find(
        opt => opt.value === String(formData.categoryId)
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

    return petObject;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 💡 LOGIC KIỂM TRA ID MỚI ĐƯỢC THÊM VÀO
    if (formType === 'update' && initialPetData?.id !== Number(formData.id)) {
      setIdError('Không được thay đổi ID của thú cưng.');
      setToast({
        message: 'Lỗi: Không được thay đổi ID của thú cưng.',
        type: 'error',
      });
      return;
    }

    // Validate form fields
    if (!validate()) {
      setToast({
        message: 'Please fill in all required fields correctly.',
        type: 'error',
      });
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
        });

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
          });
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
    setIdError(null); // 💡 Xóa lỗi ID khi hủy form
    setToast(null);
  };

  const statusOptions: SelectOption[] = [
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {formType === 'add' ? 'Add New Pet' : 'Update Pet Information'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formType === 'update' && (
            <InputGroup
              label="Pet ID"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              type="number"
              readOnly={true}
              error={idError} // 💡 Truyền lỗi ID vào InputGroup
            />
          )}
          <InputGroup
            label="Pet Name"
            name="petName"
            value={formData.petName}
            onChange={handleInputChange}
            placeholder="e.g., Kitty, Puppy"
            error={errors.petName}
          />
          <SelectGroup
            label="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            options={categories}
            error={
              errors.categoryId
                ? String(errors.categoryId)
                : errors.categoryName
            }
            disabled={isLoadingCategories}
          />
          {isLoadingCategories && (
            <p className="text-sm text-gray-500">Đang tải danh mục...</p>
          )}
          {formData.categoryId === 7 || !formData.categoryId ? (
            <InputGroup
              label="Custom Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              placeholder="Enter new category name (e.g., Ferrets)"
              error={errors.categoryName}
            />
          ) : null}
          <InputGroup
            label="Photo URLs"
            name="photoUrls"
            value={formData.photoUrls}
            onChange={handleInputChange}
            rows={3}
            placeholder="Paste image URLs here (one URL per line, or comma-separated)"
            error={errors.photoUrls}
          />
          <InputGroup
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Add relevant tags (e.g., cute, smart, comma-separated)"
          />
          <RadioGroup
            label="Status"
            name="status"
            selectedValue={formData.status}
            onChange={handleStatusChange as (value: string) => void}
            options={statusOptions}
          />
          <ActionButtons
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitText={formType === 'add' ? 'Add Pet' : 'Update Pet'}
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
