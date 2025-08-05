<?php 
namespace App\Http\Service;
use App\Models\Blog;
use App\Models\Slider;
use App\Models\Product;
use App\Models\HomeAdsBanner;
use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;


class SitemapService {
    public $siteMapDirectory = '';
    public function run_all()
    {
        $this->sitemap();
        $this->pages();
        $this->blogs();
        // $this->blogs_images();
        // $this->category_images();
        $this->category();
        $this->stores();
        // $this->stores_images();
    }
public function sitemap()
{
    $data = [
        [
            'loc' => url(asset($this->siteMapDirectory . '/pages.xml')),
            'lastmod' => Carbon::now()->toIso8601String(),
        ],
        [
            'loc' => url(asset($this->siteMapDirectory . '/blogs.xml')),
            'lastmod' => ($blog = Blog::latest('updated_at')->first()) 
                ? ($blog->updated_at->gt($blog->created_at) 
                    ? $blog->updated_at->toIso8601String() 
                    : $blog->created_at->toIso8601String()) 
                : Carbon::now()->toIso8601String(),
        ],
        [
            'loc' => url(asset($this->siteMapDirectory . '/category.xml')),
            'lastmod' => ($category = Category::latest('updated_at')->first()) 
                ? ($category->updated_at->gt($category->created_at) 
                    ? $category->updated_at->toIso8601String() 
                    : $category->created_at->toIso8601String()) 
                : Carbon::now()->toIso8601String(),
        ],
        [
            'loc' => url(asset($this->siteMapDirectory . '/stores.xml')),
            'lastmod' => ($store = Store::latest('updated_at')->first()) 
                ? ($store->updated_at->gt($store->created_at) 
                    ? $store->updated_at->toIso8601String() 
                    : $store->created_at->toIso8601String()) 
                : Carbon::now()->toIso8601String(),
        ],
    ];

    generate_sitemap_index($data, $this->siteMapDirectory, 'sitemap.xml');
}

    public function pages()
    {
        $latestDate = collect([
            optional(Blog::latest('updated_at')->first())->updated_at,
            optional(Blog::latest('created_at')->first())->created_at,
        ])->filter()->max();

        $lastmod = $latestDate ? $latestDate->toIso8601String() : Carbon::now()->toIso8601String();
        $data = [
            array('url' => route('home.index'), 'priority' => 1.0, 'changeFreq' => 'daily', 'lastmod' => $lastmod),
            array('url' => route('home.blogs'), 'priority' => 1.0, 'changeFreq' => 'daily', 'lastmod' => ($blog = Blog::latest('updated_at')->first()) ? ($blog->updated_at->gt($blog->created_at) ? $blog->updated_at->toIso8601String() : $blog->created_at->toIso8601String()) : Carbon::now()->toIso8601String()),
            array('url' => route('home.stores'), 'priority' => 0.7, 'changeFreq' => 'weekly', 'lastmod' => ($store = Store::latest('updated_at')->first()) ? ($store->updated_at->gt($store->created_at) ? $store->updated_at->toIso8601String() : $store->created_at->toIso8601String()) : Carbon::now()->toIso8601String()),
            array('url' => route('home.categories'), 'priority' => 0.7, 'changeFreq' => 'weekly', 'lastmod' => ($category = Category::latest('updated_at')->first()) ? ($category->updated_at->gt($category->created_at) ? $category->updated_at->toIso8601String() : $category->created_at->toIso8601String()) : Carbon::now()->toIso8601String()),
            array('url' => route('home.imprint'), 'priority' => 0.3, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            array('url' => route('home.faqs'), 'priority' => 0.5, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            array('url' => route('home.terms'), 'priority' => 0.3, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            array('url' => route('home.policy'), 'priority' => 0.3, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            array('url' => route('home.howToMakeMony'), 'priority' => 0.3, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            array('url' => route('home.HowToUseCoupons'), 'priority' => 0.3, 'changeFreq' => 'yearly', 'lastmod' => Carbon::now()->toIso8601String()),
            
        ];

        generate_sitemap($data, $this->siteMapDirectory, 'pages.xml');
    }

    public function blogs()
    {
        $blogsData = Blog::where('is_published', 1)->select(['slug', 'created_at', 'updated_at'])->get();
        $data  = [];
        foreach ($blogsData as $key => $blog) {
            $data[$key] = [
                'url' => route('home.blog_details', strtolower($blog->slug)),
                'lastmod' => $blog->updated_at->toIso8601String() ?? $blog->created_at->toIso8601String(),
                'priority' => '1.0',
                'changeFreq' => 'monthly'
            ];
        }
        generate_sitemap($data,  $this->siteMapDirectory, 'blogs.xml');
    }
   
    public function blogs_images()
    {
        $blogsData = Blog::where('is_published', 1)->select(['image', 'created_at', 'updated_at'])->get();
        $data      = array();
        foreach ($blogsData as $key => $value) {
            $data[$key] = [
                'url' => $value->image,
                'lastmod' => $value->updated_at->toIso8601String() ?? $value->created_at->toIso8601String(),
                'priority' => '0.4',
                'changeFreq' => 'monthly',
            ];
        }
        generate_sitemap($data, $this->siteMapDirectory, 'blogs-images.xml');
    }
    //  Stores
 
    public function category_images()
    {
        $blogsData = Category::latest()->select(['image_icon', 'updated_at', 'created_at'])->get();
        $data      = array();
        foreach ($blogsData as $key => $value) {
            $data[$key] = [
                'url' => $value->image_icon,
                'lastmod' => $value->updated_at->toIso8601String() ?? $value->created_at->toIso8601String(),
                'priority' => '0.4',
                'changeFreq' => 'monthly'
            ];
        }
        generate_sitemap($data, $this->siteMapDirectory, 'category-images.xml');
    }

    public function stores()
    {
        $storeData  = Store::select(['slug', 'updated_at', 'created_at'])->latest()->get();
        $data       = array();
        foreach ($storeData as $key => $value) {
            $data[$key] = [
                'url' => route('home.store_details', $value->slug),
                'lastmod' => $value->updated_at->toIso8601String() ?? $value->created_at->toIso8601String(),
                'priority' => '1.0',
                'changeFreq' => 'weekly'
            ];
        }
        generate_sitemap($data, $this->siteMapDirectory, 'stores.xml');
    }
    public function category()
    {
        $blogsData = Category::select(['name', 'slug', 'created_at', 'updated_at'])->latest()->get();
        $data     = [];
        foreach ($blogsData as $key => $value) {
            $data[$key] = [
                'url' => route('home.category_details', $value->slug),
                'lastmod' => $value->updated_at->toIso8601String() ?? $value->created_at->toIso8601String(),
                'priority' => '0.7',
                'changeFreq' => 'weekly'
            ];
        }
        generate_sitemap($data, $this->siteMapDirectory, 'category.xml');
    }
    public function stores_images()
    {
        $blogsData  = Store::latest()->get();
        $data       = [];
        foreach ($blogsData as $key => $value) {
            $storeImage  = $value->thumbnail;
            $data[$key] = [
                'url' => $storeImage,
                'lastmod' => $value->updated_at->toIso8601String() ?? $value->created_at->toIso8601String(),
                'priority' => '0.5',
                'changeFreq' => 'monthly'
            ];
        }
        generate_sitemap($data, $this->siteMapDirectory, 'stores-images.xml');
    }
}