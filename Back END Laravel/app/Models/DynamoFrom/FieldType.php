<?php

namespace App\Models\DynamoFrom;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldType extends Model
{
    use HasFactory;
    protected $table = 'field_types';
    protected $fillable = ['name','createdby', 'updatedby', 'created_at', 'updated_at'];
    protected $hidden = ['created_at', 'updated_at'];
}
