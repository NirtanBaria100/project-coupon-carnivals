'use client';

import RichTextEditor from '@/components/Joditeditor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Category = {
    id: number;
    name: string;
};
interface CreateProp {
    categories: Category[];
    csrfToken: string,
}

export default function Create({ categories, csrfToken }: CreateProp) {
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
    const [content, setContent] = useState();
    const [contentExtra, setContentExtra] = useState();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked, files } = e.target as HTMLInputElement;

        if (type === 'file' && files) {
            setData(name, files[0]); // Store file
            setImagePreview(URL.createObjectURL( files[0]));
        } else {
            setData(name, type === 'checkbox' ? checked : value);
            setImagePreview("");
        }

 
    };
const [imagePreview, setImagePreview] = useState<string | null>(null);

const handleRemoveImage = () => {
    setData('image_icon', null);
    setImagePreview(null);
    // Optionally clear the file input as well if you want to reset the actual <input> value
    const fileInput = document.getElementById('image_icon_input') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
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
        { title: 'Categories', href: route('admin.categories.index') },
        { title: 'Create Category', href: route('admin.categories.create') },
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
                        <label className="block font-semibold text-sm">Sidebar Description</label>
                        <RichTextEditor content={content} setContent={setContent} setFormData={setData} name={'desc'} csrfToken={csrfToken} path={'categories'} />

                    </div>

                    <input
                        name="icon"
                        placeholder="Icon Class (e.g. fa fa-star)"
                        value={data.icon}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

              <div>
    <label className="block font-semibold text-sm mb-2">Image Icon</label>
    <input
        id="image_icon_input"
        type="file"
        name="image_icon"
        accept="image/*"
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
    />

    {imagePreview && (
        <div className="mt-3">
            <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded border" />
            <Button type="button" variant="destructive" className="mt-2" onClick={handleRemoveImage}>
                Remove Image
            </Button>
        </div>
    )}
</div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="is_popular" className="text-gray-800 dark:text-white">
                            Is Popular
                        </label>
                        <Switch checked={data.is_popular} onCheckedChange={(checked) => handleSwitch('is_popular', checked)} />
                    </div>

                    <label className="block font-semibold text-sm">Single Line Description</label>
                    <RichTextEditor content={contentExtra} setContent={setContentExtra} setFormData={setData} name={'single_line_desc'} csrfToken={csrfToken} path={'categories'} />


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
