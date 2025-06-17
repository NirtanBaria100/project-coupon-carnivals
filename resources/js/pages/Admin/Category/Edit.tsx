'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type Category = {
    id: number;
    name: string;
};

interface EditProps {
    category: {
        id: number;
        name: string;
        slug: string;
        desc: string;
        parent_cat: string | null;
        icon: string;
        image_icon: string;
        single_line_desc: string;
        is_popular: boolean;
        focus_keyphrase: string;
        seo_title: string;
        meta_description: string;
    };
    categories: Category[];
}

export default function Edit({ category, categories }: EditProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: category.id,
        name: category.name || '',
        slug: category.slug || '',
        desc: category.desc || '',
        parent_cat: category.parent_cat,
        icon: category.icon || '',
        image_icon: null as File | null,
        single_line_desc: category.single_line_desc || '',
        is_popular: category.is_popular || false,
        focus_keyphrase: category.focus_keyphrase || '',
        seo_title: category.seo_title || '',
        meta_description: category.meta_description || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked, files } = e.target as HTMLInputElement;

        if (type === 'file' && files?.length) {
            setData(name, files[0]);
        } else {
            setData(name, type === 'checkbox' ? checked : value);
        }
    };
    const handleSwitch = (name: string, value: boolean) => {
        setData(name, value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT'); 

        // Append all other fields
        formData.append('name', data.name);
        formData.append('slug', data.slug);
        formData.append('desc', data.desc);
        formData.append('parent_cat', data.parent_cat ?? '');
        formData.append('icon', data.icon);
        formData.append('single_line_desc', data.single_line_desc);
        formData.append('is_popular', data.is_popular ? '1' : '0');
        formData.append('focus_keyphrase', data.focus_keyphrase);
        formData.append('seo_title', data.seo_title);
        formData.append('meta_description', data.meta_description);

        // Append the image file if selected
        if (data.image_icon instanceof File) {
            formData.append('image_icon', data.image_icon);
        }

        router.post(route('admin.categories.update', data.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Category updated!', { position: toastDirection });
            },
            onError: (errors) => Object.values(errors).forEach((msg) => toast.error(msg, { position: toastDirection })),

        });
    };

    const breadcrumbs = [
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Edit Category', href: `/admin/categories/${category.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Category</h1>
                    <Button type="submit" form="edit-category-form" disabled={processing}>
                        {processing ? 'Saving...' : 'Save changes'}
                    </Button>
                </div>

                <form id="edit-category-form" onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black">
                    <input
                        name="name"
                        placeholder="Category Name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        name="slug"
                        placeholder="Slug"

                        value={data.slug}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <select
                        name="parent_cat"
                        value={data.parent_cat}
                        onChange={handleChange}
                        className="w-full rounded border bg-white px-3 py-2 dark:bg-black"
                    >
                        <option value="">Select Parent Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        name="desc"
                        placeholder="Description"
                        value={data.desc}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        name="icon"
                        placeholder="Icon Class (e.g. fa fa-star)"
                        value={data.icon}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Image</label>
                        {category.image_icon && (
                            <img src={category.image_icon} alt="Current" className="mb-2 h-16 w-16 rounded border object-cover" />
                        )}
                        <input type="file" name="image_icon" accept="image/*" onChange={handleChange} className="w-full rounded border px-3 py-2" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="is_popular" className="text-gray-800 dark:text-white">
                            Is Popular
                        </label>
                        <Switch checked={data.is_popular} onCheckedChange={(checked) => handleSwitch('is_popular', checked)} />
                    </div>

                    <input
                        name="single_line_desc"
                        placeholder="Short Description"
                        value={data.single_line_desc}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">SEO</h1>

                    <input
                        name="focus_keyphrase"
                        placeholder="Focus Keyphrase"
                        value={data.focus_keyphrase}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        name="seo_title"
                        placeholder="SEO Title"
                        value={data.seo_title}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <textarea
                        name="meta_description"
                        placeholder="Meta Description"
                        value={data.meta_description}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />
                </form>
            </div>
        </AppLayout>
    );
}
