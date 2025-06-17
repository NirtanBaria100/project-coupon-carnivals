'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

type Category = {
    id: number;
    name: string;
};
interface CreateProp {
    categories: Category[];
}

export default function Create({ categories }: CreateProp) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        desc: '',
        parent_cat: '',
        icon: '',
        image_icon: null, // change from '' to null
        single_line_desc: '',
        is_popular: false,
        focus_keyphrase: '',
        seo_title: '',
        meta_description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked, files } = e.target as HTMLInputElement;

        if (type === 'file' && files) {
            setData(name, files[0]); // Store file
        } else {
            setData(name, type === 'checkbox' ? checked : value);
        }
    };

    const handleSwitch = (name: string, value: boolean) => {
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        post(route('admin.categories.create'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Category created!', { position: toastDirection });
                reset();
            },
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) =>
                toast.error(msg, {
                    position: toastDirection,
                }),
            );
        }
        console.log({ errors });
    }, [errors]);

    const breadcrumbs = [
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Create Category', href: '/admin/categories/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Category</h1>
                    <Button type="submit" form="create-category-form" disabled={processing}>
                        {processing ? 'Saving...' : 'Save changes'}
                    </Button>
                </div>

                <form
                    id="create-category-form"
                    onSubmit={handleSubmit}
                    className="max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black"
                >
                    <div>
                        <input
                            name="name"
                            placeholder="Category Name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div>
                        <input name="slug" placeholder="Slug" value={data.slug} onChange={handleChange} className="w-full rounded border px-3 py-2" />
                    </div>

                    <div>
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
                    </div>

                    <div>
                        <textarea
                            name="desc"
                            placeholder="Description"
                            value={data.desc}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <input
                        name="icon"
                        placeholder="Icon Class (e.g. fa fa-star)"
                        value={data.icon}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <input type="file" name="image_icon" accept="image/*" onChange={handleChange} className="w-full rounded border px-3 py-2" />

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
