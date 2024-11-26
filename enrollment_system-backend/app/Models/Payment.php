<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    // Add 'status' to the fillable array so it can be mass-assigned
    protected $fillable = ['student_id', 'mobile_number', 'sender_name', 'reference_number', 'amount', 'status'];

    // Define the relationship to the Student model
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
