<?php

namespace App\Models\DynamoFrom;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DynamoFrom\FieldType;
class FromField extends Model
{
    use HasFactory;
    protected $table = 'from_fields';
    protected $fillable = ['id', 'tracking_id', 'name', 'field_type_id', 'is_required', 'readonly', 'createdby', 'updatedby', 'created_at', 'updated_at'];

    protected $hidden = ['created_at', 'updated_at'];
    public function field_type()
    {
        return $this->belongsTo(FieldType::class, 'field_type_id', 'id');
    }
}
