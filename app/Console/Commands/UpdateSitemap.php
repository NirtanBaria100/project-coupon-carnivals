<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Service\SitemapService;

class UpdateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap =  new SitemapService();
        dd($sitemap->run_all());
    }
}
