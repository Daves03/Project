<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'email', 'student_number', 'last_name', 'first_name', 'middle_name','program', 'year_level', 'semester', 'student_status',
        'sex', 'contact_number', 'facebook_link', 'birthdate', 'status', 'faculty_status','admin_status', 'user_id'
    ];

    // Relationship to Guardian
    public function guardian()
    {
        return $this->hasOne(Guardian::class);
    }

    // Relationship to Address
    public function address()
    {
        return $this->hasOne(Address::class);
    }

    // Relationship to Payment
    public function payment()
    {
        return $this->hasOne(Payment::class, 'student_id', 'id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function user()
{
    return $this->belongsTo(User::class);
}

    
}
