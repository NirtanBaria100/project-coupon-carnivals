'use client';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface EditProps {
  tag: {
    id: number;
    name: string;
    slug: string;
    desc?: string;
  };
}

export default function Edit({ tag }: EditProps) {
  // Initialize form with existing tag data
  const { data, setData, put, processing, errors } = useForm({
    name: tag.name,
    slug: tag.slug,
    desc: tag.desc || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send PUT request to update tag
    put(route('admin.tags.update', tag.id));
  };

  // Show validation errors as toast notifications
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) =>
        toast.error(msg, {
          position: toastDirection,
        }),
      );
    }
  }, [errors]);

  const breadcrumbs = [
    { title: 'Tags', href: '/admin/tags/' },
    { title: 'Edit Tag', href: `/admin/tags/${tag.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Tag" />
      <div className="p-5">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Tag</h1>
          <Button type="submit" form="edit-tag-form" disabled={processing}>
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <form
          id="edit-tag-form"
          onSubmit={handleSubmit}
          className="max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black"
        >
          <input
            name="name"
            placeholder="Tag Name"
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

          <textarea
            name="desc"
            placeholder="Description"
            value={data.desc}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </form>
      </div>
    </AppLayout>
  );
}
