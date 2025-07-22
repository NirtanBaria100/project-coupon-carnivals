<?php

use Illuminate\Support\Facades\File;
if (!function_exists('generate_sitemap')) {
    function generate_sitemap($sitemapData, $directoryName, $filename)
    {
        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');

        foreach ($sitemapData as $data) {
            $url = $xml->addChild('url');
            $url->addChild('loc', htmlspecialchars($data['url']));
            if (!empty($data['lastmod'])) {
                $url->addChild('lastmod', $data['lastmod']);
            }
            if (!empty($data['changeFreq'])) {
                $url->addChild('changefreq', $data['changeFreq']);
            }
            if (!empty($data['priority'])) {
                $url->addChild('priority', $data['priority']);
            }
        }
        $filePath = public_path($directoryName . '/' . $filename);
        $directory = dirname($filePath);
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }
        $xmlContent = $xml->asXML();
        file_put_contents($filePath, $xmlContent);
        return response(['success' => true, 'xml' => $xml]);
    }
}