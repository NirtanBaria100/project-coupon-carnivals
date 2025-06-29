// resources/js/Pages/Admin/Blogs/Create.tsx

import BlogEditor from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Select, { defaultTheme } from 'react-select';
import customSelectStyles from '@/components/ui/CustomSelectStyles';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/Joditeditor/RichTextEditor';

interface CreateProps {
    categories: { id: number; name: string }[];
    csrfToken : string,
}

export default function Create({ categories , csrfToken }: CreateProps) {
    const categoryOptions = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name })) ?? [];
    const [content , setContent] = useState();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        image: null as File | null,
        is_published: false,
        category_id: '',
        focus_keyphrase: '',
        seo_title: '',
        meta_description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.blogs.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Blogs', href: '/admin/blogs' },
        { title: 'Create Blog', href: '/admin/blogs/create' },
    ];

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) => toast.error(msg));
        }
    }, [errors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Blog</h1>
                    <Button onClick={handleSubmit} variant="default" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-0">
                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:col-span-2 md:p-6 dark:bg-black">
                            <Input name="title" placeholder="Title" required value={data.title} onChange={handleChange} />
                            <Input name="slug" placeholder="Slug" required value={data.slug} onChange={handleChange} />

                            <label className="block font-medium">Content</label>
                            <RichTextEditor content={content} setContent={setContent} setFormData={setData}  name={'content'}  csrfToken={csrfToken} path={'blogs'}/>
                            <Input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            <Input name="seo_title" placeholder="SEO Title" value={data.seo_title} onChange={handleChange} />
                            <Input name="focus_keyphrase" placeholder="Focus Keyphrase" value={data.focus_keyphrase} onChange={handleChange} />
                            <Textarea name="meta_description" placeholder="Meta Description" value={data.meta_description} onChange={handleChange} />

                        </div>

                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:p-6 dark:bg-black">
                            <label className="block font-medium">Category</label>
                            <Select
                                options={categoryOptions}
                                onChange={(selected) => setData('category_id', selected?.value)}
                                placeholder="Select Category"
                                styles={customSelectStyles}
                            />

                            <div className="flex items-center justify-between">
                                <label className="font-medium">Publish</label>
                                <Switch checked={data.is_published} onCheckedChange={(val) => setData('is_published', val)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
