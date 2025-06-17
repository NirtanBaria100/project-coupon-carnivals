<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class ReorderController extends Controller
{
    // Show reorder page
    public function edit($storeId)
    {
        $stores = Store::select('id', 'name')->get();


        if ($storeId == "default") {
            $storeId = $stores[0]->id;
        }



        $coupons = Coupon::select('coupons.*', 'coupon_order.position')
            ->join('coupon_store', 'coupon_store.coupon_id', '=', 'coupons.id')
            ->leftJoin('coupon_order', function ($join) use ($storeId) {
                $join->on('coupon_order.coupon_id', '=', 'coupons.id')
                    ->where('coupon_order.store_id', '=', $storeId);
            })
            ->where('coupon_store.store_id', $storeId)
            ->orderBy('coupon_order.position')
            ->get()
            ->map(function ($coupon) {
                $coupon->featured_image = $coupon->featured_image
                    ? asset($coupon->featured_image)
                    : asset('images/placeholder.png');
                return $coupon;
            });

        return Inertia::render('Admin/Reorder/Index', [
            'storeId' => (int) $storeId,
            'stores' => $stores,
            'coupons' => $coupons,
        ]);
    }


    // Persist new order
    public function updateOrder(Request $request, $storeTypeId)
    {

        $ids = $request->validate([
            'orderedIds' => 'required|array',
            'orderedIds.*' => 'integer|exists:coupons,id',
        ])['orderedIds'];

        // wrap in transaction
        DB::transaction(function () use ($storeTypeId, $ids) {
            foreach ($ids as $position => $couponId) {
                DB::table('coupon_order')
                    ->updateOrInsert(
                        ['store_id' => $storeTypeId, 'coupon_id' => $couponId],
                        ['position' => $position]
                    );
            }
        });

        // return response()->json(['success' => true]);
        return redirect()->route('admin.coupons.reorder.edit', $storeTypeId)->with('success', true);
    }
}
