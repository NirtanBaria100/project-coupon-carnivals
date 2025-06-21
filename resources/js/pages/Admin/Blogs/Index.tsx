// resources/js/Pages/Admin/Blogs/Index.tsx

import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

interface Blog {
  id: number
  title: string
  slug: string
  is_published: boolean
}

interface Props {
  blogs: Blog[]
}

export default function Index({ blogs }: Props) {
  const { patch } = useForm()

  const togglePublish = (id: number, value: boolean) => {
    patch(route('admin.blogs.update', id), {
      is_published: value,
      preserveScroll: true,
    })
  }

  return (
    <AppLayout>
      <Head title="Blogs" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href={route('admin.blogs.create')}>
          <Button>Add Blog</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell>
                <Switch checked={blog.is_published} onCheckedChange={(val) => togglePublish(blog.id, val)} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={route('admin.blogs.edit', blog.id)}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  )
}
