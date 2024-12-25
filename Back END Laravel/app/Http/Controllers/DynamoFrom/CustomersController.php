<?php

namespace App\Http\Controllers\DynamoFrom;

use App\Http\Controllers\Controller;
use App\Models\DynamoFrom\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class CustomersController extends Controller
{
    public function index()
    {
        $customers = Customer::with('from_field')->get();
        return response()->json($customers);
    }

    public function show($id)
    {
        $customer = Customer::with('from_field')->findOrFail($id);
        return response()->json($customer);
    }

    public function store(Request $request)
    {
        Log::info('Request Data: ', $request->all());
        DB::beginTransaction();
        try {
            foreach ($request->all() as $customerData) {
                // Validation for each customer
                $validated = Validator::make($customerData, [
                    'value' => 'required|string',
                    'from_field_id' => 'required|exists:from_fields,id',
                    'createdby' => 'nullable|integer',
                    'updatedby' => 'nullable|integer',
                ])->validate();
    
                // Log validated data
                Log::info('Validated Data: ', $validated);
    
                // Generate tracking ID in the format Ymdms
                $trackingId = now()->format('Ymdms');
    
                // Add tracking ID to validated data
                $validated['tracking_id'] = $trackingId;
    
                // Create the Customer record
                $customer = Customer::create($validated);
    
                // Log created Customer
                Log::info('Created Customer: ', $customer->toArray());
            }
    
            DB::commit();
    
            return response()->json(['message' => 'Customers info created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            Log::error('Error in store method: ' . $e->getMessage());
    
            return response()->json(['message' => 'An error occurred while creating the customers.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        Log::info('Request Data: ', $request->all());
        DB::beginTransaction();
        try {
            // Validation for the request data
            $validatedData = Validator::make($request->all(), [
                'value' => 'required|string',
                'from_field_id' => 'required|exists:from_fields,id',
                'createdby' => 'nullable|integer',
                'updatedby' => 'nullable|integer',
            ])->validate();
    
            // Log validated data
            Log::info('Validated Data: ', $validatedData);
    
            // Generate tracking ID in the format Ymdms
            $trackingId = now()->format('Ymdms');
    
            // Add tracking ID to validated data
            $validatedData['tracking_id'] = $trackingId;
    
            // Find the existing Customer record
            $customer = Customer::findOrFail($id);
    
            // Update the customer data in the Customer table
            $customer->update($validatedData);
    
            // Log updated Customer
            Log::info('Updated Customer: ', $customer->toArray());
    
            DB::commit();
    
            return response()->json(['message' => 'Customer info updated successfully', 'data' => $customer], 204);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            Log::error('Error in update method: ' . $e->getMessage());
    
            return response()->json(['message' => 'An error occurred while updating the customer.'], 500);
        }
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => 'Customer info deleted successfully'], 200);
    }
}