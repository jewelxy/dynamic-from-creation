<?php

namespace App\Models\DynamoFrom;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DynamoFrom\FromField;
class Customer extends Model
{
    use HasFactory;
    protected $table = 'customers';
    protected $fillable = ['id', 'tracking_id', 'value', 'from_field_id', 'createdby', 'updatedby', 'created_at', 'updated_at'];
    protected $hidden = ['created_at', 'updated_at'];
    public function from_field()
    {
        return $this->belongsTo(FromField::class, 'from_field_id', 'id');
    }
}
