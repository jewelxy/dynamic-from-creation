<?php

namespace App\Http\Controllers\DynamoFrom;

use App\Http\Controllers\Controller;
use App\Models\DynamoFrom\FromField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FromFieldController extends Controller
{
    public function index()
    {
        $fromFields = FromField::with('field_type')->get();
        return response()->json($fromFields);
    }

    public function show($id)
    {
        $fromField = FromField::findOrFail($id);
        return response()->json($fromField);
    }

    public function store(Request $request)
    {
        Log::info('Request Data: ', $request->all());
        DB::beginTransaction();
        try {
            foreach ($request->all() as $fieldData) {
                // Validation for each field
                $validated = Validator::make($fieldData, [
                    'field_type_id' => 'required|integer|exists:field_types,id',
                    'name' => 'required|string|max:255',
                    'is_required' => 'nullable|boolean',
                    'readonly' => 'nullable|boolean',
                ])->validate();
    
                // Log validated data
                Log::info('Validated Data: ', $validated);
    
                // Generate tracking ID in the format Ymdms
                $trackingId = now()->format('Ymdms');
    
                // Store the field data in the FromField table
                $fromField = FromField::create([
                    'tracking_id' => $trackingId,
                    'field_type_id' => $validated['field_type_id'],
                    'name' => $validated['name'],
                    'is_required' => $validated['is_required'] ?? false, // Provide default value
                    'readonly' => $validated['readonly'] ?? false, // Provide default value
                ]);
    
                // Log created FromField
                Log::info('Created FromField: ', $fromField->toArray());
            }
    
            DB::commit();
    
            return response()->json(['message' => 'Fields saved successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            Log::error('Error in store method: ' . $e->getMessage());
    
            return response()->json(['message' => 'An error occurred while saving the fields.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        Log::info('Request Data: ', $request->all());
        DB::beginTransaction();
        try {
            // Validation for the request data
            $validated = Validator::make($request->all(), [
                'field_type_id' => 'required|integer|exists:field_types,id',
                'name' => 'required|string|max:255',
                'is_required' => 'nullable|boolean',
                'readonly' => 'nullable|boolean',
            ])->validate();
    
            // Log validated data
            Log::info('Validated Data: ', $validated);
    
            // Generate tracking ID in the format Ymdms
            $trackingId = now()->format('Ymdms');
    
            // Find the existing FromField record
            $fromField = FromField::findOrFail($id);
    
            // Update the field data in the FromField table
            $fromField->update([
                'tracking_id' => $trackingId,
                'field_type_id' => $validated['field_type_id'],
                'name' => $validated['name'],
                'is_required' => $validated['is_required'] ?? false, // Provide default value
                'readonly' => $validated['readonly'] ?? false, // Provide default value
            ]);
    
            // Log updated FromField
            Log::info('Updated FromField: ', $fromField->toArray());
    
            DB::commit();
    
            return response()->json(['message' => 'Field updated successfully'], 204);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            Log::error('Error in update method: ' . $e->getMessage());
    
            return response()->json(['message' => 'An error occurred while updating the field.'], 500);
        }
    }

    public function destroy($id)
    {
        $fromField = FromField::findOrFail($id);
        $fromField->delete();
        return response()->json(['message' => 'Field deleted successfully'], 200);
    }
}