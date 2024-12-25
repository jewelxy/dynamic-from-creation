<?php

namespace App\Http\Controllers\DynamoFrom;

use App\Http\Controllers\Controller;
use App\Models\DynamoFrom\FieldType;
use Illuminate\Http\Request;

class FieldTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fieldTypes = FieldType::all();
        return response()->json($fieldTypes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FieldType $fieldType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FieldType $fieldType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FieldType $fieldType)
    {
        //
    }
}
