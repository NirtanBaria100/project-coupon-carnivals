import RichTextEditor from '@/components/Joditeditor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import customSelectStyles from '@/components/ui/CustomSelectStyles';
import { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    is_published: boolean;
    category_id: number | null;
    focus_keyphrase: string | null;
    seo_title: string | null;
    meta_description: string | null;
}

interface Props {
    blog: Blog;
    categories: Category[];
    csrfToken: string;
}

export default function Edit({ blog, categories, csrfToken }: Props) {
    const categoryOptions = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }));

    const [content, setContent] = useState(blog.content || '');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, processing, errors } = useForm({
        id: blog.id,
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        image: null as File | null,
        is_published: blog.is_published || false,
        category_id: blog.category_id?.toString() || '',
        focus_keyphrase: blog.focus_keyphrase || '',
        seo_title: blog.seo_title || '',
        meta_description: blog.meta_description || '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('category_id', data.category_id);
        formData.append('focus_keyphrase', data.focus_keyphrase);
        formData.append('seo_title', data.seo_title);
        formData.append('meta_description', data.meta_description);
        formData.append('is_published', data.is_published ? '1' : '0');

        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(route('admin.blogs.update', data.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => toast.success('Blog updated!'),
            onError: (errs) => {
                Object.values(errs).forEach((msg) => toast.error(msg));
            },
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) => toast.error(msg));
        }
    }, [errors]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Blogs', href: route("admin.blogs.index") },
        { title: 'Edit Blog', href: route('admin.blogs.edit', blog.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog</h1>
                    <Button onClick={handleSubmit} variant="default" disabled={processing}>
                        {processing ? 'Updating...' : 'Update'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-0">
                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:col-span-2 md:p-6 dark:bg-black">
                            <Input name="title" placeholder="Title" required value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            <Input name="slug" placeholder="Slug" required value={data.slug} onChange={(e) => setData('slug', e.target.value)} />

                            <label className="block font-medium">Content</label>
                            <RichTextEditor content={content} setContent={setContent} setFormData={setData} name={'content'} csrfToken={csrfToken} path={'post'} />

                            <label className="block font-medium">Image</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded border px-3 py-2" />
                            {(imagePreview || blog.image) && (
                                <img
                                    src={imagePreview || (blog.image?.startsWith('http') ? blog.image : `http://127.0.0.1:8000${blog.image}`)}
                                    alt="Thumbnail"
                                    className="mt-2 h-16 w-16 rounded object-cover"
                                />
                            )}

                            <Input name="seo_title" placeholder="SEO Title" value={data.seo_title} onChange={(e) => setData('seo_title', e.target.value)} />
                            {/* <Input name="focus_keyphrase" placeholder="Focus Keyphrase" value={data.focus_keyphrase} onChange={(e) => setData('focus_keyphrase', e.target.value)} /> */}
                            <Textarea name="meta_description" placeholder="Meta Description" value={data.meta_description} onChange={(e) => setData('meta_description', e.target.value)} />
                        </div>

                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:p-6 dark:bg-black">
                            <label className="block font-medium">Category</label>
                            <Select
                                isClearable={true}
                                options={categoryOptions}
                                value={categoryOptions.find(opt => opt.value === data.category_id)}
                                onChange={(selected) => setData('category_id', selected?.value || '')}
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
