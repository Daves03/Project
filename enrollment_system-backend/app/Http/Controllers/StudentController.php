<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function enroll(Request $request)
{
    Log::info('Enrollment request received', $request->all());
    Log::info('Request headers:', $request->headers->all());
    try { $user = $request->user(); if (!$user) { throw new \Exception('User not authenticated'); } Log::info('Authenticated user:', ['user_id' => $user->id, 'email' => $user->email]); } catch (\Exception $e) { Log::error('Authentication Error: ' . $e->getMessage()); return response()->json(['error' => 'Authentication error occurred.'], 401); // 401 Unauthorized 
        }

    $validatedData = $request->validate([
        'email' => 'required|email',
        'studentNumber' => 'required|string',
        'lastName' => 'required|string',
        'firstName' => 'required|string',
        'middleName' => 'required|string',
        'sex' => 'required|string',
        'contactNumber' => 'required|string',
        'birthdate' => 'required|date',
        'guardianName' => 'required|string',
        'guardianPhone' => 'required|string',
        'religion' => 'required|string',
        'houseNumber' => 'required|string',
        'street' => 'required|string',
        'subdivision' => 'nullable|string',
        'barangay' => 'required|string',
        'municipality' => 'required|string',
        'zipCode' => 'required|string',
        'mobileNumber' => 'required|string',
        'senderName' => 'required|string',
        'referenceNumber' => 'required|string',
        'amount' => 'required|numeric',
    ]);

    $validatedData['student_number'] = $validatedData['studentNumber'];
    unset($validatedData['studentNumber']);
    $validatedData['last_name'] = $validatedData['lastName'];
    unset($validatedData['lastName']);
    $validatedData['first_name'] = $validatedData['firstName'];
    unset($validatedData['firstName']);
    $validatedData['middle_name'] = $validatedData['middleName'];
    unset($validatedData['middleName']);
    $validatedData['contact_number'] = $validatedData['contactNumber'];
    unset($validatedData['contactNumber']);

    // Corrected line
    $validatedData['user_id'] = $user->id;

    DB::beginTransaction();

    try {
        // Create the student record
        $student = Student::create($validatedData);

        // Create the guardian record associated with the student
        $student->guardian()->create([
            'name' => $validatedData['guardianName'],
            'phone' => $validatedData['guardianPhone'],
            'religion' => $validatedData['religion'],
        ]);

        // Create the address record associated with the student
        $student->address()->create([
            'house_number' => $validatedData['houseNumber'],
            'street' => $validatedData['street'],
            'subdivision' => $validatedData['subdivision'],
            'barangay' => $validatedData['barangay'],
            'municipality' => $validatedData['municipality'],
            'zip_code' => $validatedData['zipCode'],
        ]);

        // Create the payment record associated with the student and set payment_status to 'pending'
        $student->payment()->create([
            'mobile_number' => $validatedData['mobileNumber'],
            'amount' => $validatedData['amount'],
            'sender_name' => $validatedData['senderName'],
            'reference_number' => $validatedData['referenceNumber'],
            'payment_status' => 'pending'
        ]);

        // Commit the transaction
        DB::commit();

        Log::info('Enrollment successful', ['student_id' => $student->id]);

        return response()->json(['message' => 'Enrollment successful!'], 201);
    } catch (\Illuminate\Database\QueryException $e) {
        DB::rollBack(); 
        Log::error('Database Error: ' . $e->getMessage(), ['request' => $request->all()]);
        return response()->json(['error' => 'Database error occurred.'], 500);
    } catch (\Exception $e) {
        DB::rollBack(); 
        Log::error('General Error: ' . $e->getMessage(), ['request' => $request->all()]);
        return response()->json(['error' => 'An error occurred.'], 500);
    }
}


    public function getAllStudents()
    {
        try {
            $students = Student::with('payment')->where('archived', false)->get();
    
            foreach ($students as $student) {
                Log::info('Student:', $student->toArray());
                if ($student->payment) {
                    Log::info('Payment:', $student->payment->toArray());
                } else {
                    Log::info('No payment associated with student ID:', $student->id);
                }
            }
    
            return response()->json($students, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching students: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching students'], 500);
        }
    }
    

    public function declinePayment(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $student = Student::find($id);
        if (!$student) {
            return response()->json(['error' => 'Student not found.'], 404);
        }

        $student->status = 'officer_declined'; 
        $student->archived = true;            
        $student->save();

        $notification = new Notification();
        $notification->student_id = $student->id;
        $notification->message = $request->input('message');
        $notification->type = 'decline';
        $notification->created_at = now();
        $notification->save();

        Log::info('Notification created', ['student_id' => $student->id, 'notification' => $notification]);

        return response()->json([
            'message' => 'Payment declined, student archived, and notification created successfully.',
            'notification' => $notification,
        ]);
    }

    public function approveByOfficer($id)
    {
        $enrollment = Student::findOrFail($id);
        $enrollment->status = 'officer_approved'; 
        
        $enrollment->save();  

        return response()->json(['message' => 'Enrollment approved and forwarded to faculty.']);
    }

    public function getFacultyEnrollments()
    {
        $enrollments = Student::where('status', 'officer_approved') 
            ->get(['id', 'first_name', 'last_name', 'student_number', 'status']); 
        
        return response()->json($enrollments);
    }

    public function getStudents()
{
    $students = Student::with('payment') // Include the payment relationship
        ->where('status', '!=', 'officer_approved')
        ->where('archived', false)
        ->get();

    return response()->json($students);
}

    public function getUsers()
    {
        try {
            $users = DB::table('users')->select('email', 'student_number')->get();
            Log::info('Fetched users:', $users->toArray());
            return response()->json($users, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching users'], 500);
        }
    }

   public function getLoggedInUser(Request $request)
{
    try {
        $user = $request->user(); // Assuming you're using Laravel's authentication
        return response()->json($user, 200);
    } catch (\Exception $e) {
        Log::error('Error fetching logged-in user: ' . $e->getMessage());
        return response()->json(['error' => 'Error fetching logged-in user'], 500);
    }
}

}
