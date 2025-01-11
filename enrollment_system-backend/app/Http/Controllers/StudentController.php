<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\StudentDetails;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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
            'subdivision' => 'required|string',
            'barangay' => 'required|string',
            'municipality' => 'required|string',
            'zipCode' => 'required|string',
            'mobileNumber' => 'required|string',
            'senderName' => 'required|string',
            'referenceNumber' => 'required|string',
            'amount' => 'required|numeric',
            'yearLevel' => 'required|in:First Year,Second Year,Third Year,Fourth Year',
            'semester' => 'required|string', 
            'studentstatus' => 'required|in:Regular, Irregular, transferee, freshmen',
            'program' => 'required|string|in:Bachelor of Science in Computer Science,Bachelor of Science in Information Technology',
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

    $validatedData['year_level'] = $validatedData['yearLevel'];
    unset($validatedData['yearLevel']);
    $validatedData['semester'] = $validatedData['semester'];
    $validatedData['student_status'] = $validatedData['studentstatus'];
    $validatedData['program'] = $validatedData['program'];
    

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
            ->where('faculty_status', '!=', 'faculty_approved')
            ->get(['id', 'first_name', 'last_name', 'student_number', 'status', 'faculty_status', 'program', 'year_level', 'semester']);
        
        return response()->json($enrollments);
    }
    

    public function getStudents()
{
    $students = Student::with('payment') 
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

    public function fetchEnrollmentStudentDetails() { $user = Auth::user(); $studentDetails = $user->studentDetails;  return response()->json($studentDetails);  }

    
    public function approveByFaculty($id)
{
    $enrollment = Student::findOrFail($id);
    $enrollment->faculty_status = 'faculty_approved';
    $enrollment->save();

    return response()->json(['message' => 'Enrollment approved by faculty and forwarded to admin.']);
}


public function declineByFaculty($id)
{
    $enrollment = Student::findOrFail($id);
    $enrollment->faculty_status = 'faculty_declined';
    $enrollment->archived = true;
    $enrollment->save();

    return response()->json(['message' => 'Enrollment declined and archived by faculty.']);
}

// Example for logging in your controller
public function getAdminEnrollments()
{
    $enrollments = Student::where('status', 'officer_approved')
    ->where('admin_status', '!=', 'admin_approved')
        ->where('faculty_status', 'faculty_approved')
        ->get(['id', 'first_name', 'last_name', 'student_number', 'status', 'faculty_status', 'program', 'year_level', 'semester']);
    
    return response()->json($enrollments);
}


public function updateStudentStatus(Request $request, $id)
{
    $request->validate([
        'student_status' => 'required|string|in:Regular,Irregular'
    ]);

    DB::beginTransaction();

    try {
        // Find the student by ID
        $student = Student::findOrFail($id);
        $userId = $student->user_id; // Get the user ID

        // Update student status in students table
        $student->student_status = $request->student_status;
        $student->save();

        // Update student status in student_details table
        $studentDetails = StudentDetails::where('user_id', $userId)->first();
        if ($studentDetails) {
            $studentDetails->student_status = $request->student_status;
            $studentDetails->save();
        }

        DB::commit();
        return response()->json(['message' => 'Student status updated successfully.']);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'Failed to update student status.'], 500);
    }
}


public function approveByAdmin($id)
{
    DB::beginTransaction();

    try {
        // Find the student by ID
        $student = Student::findOrFail($id);

        // Update student status in students table
        $student->admin_status = 'admin_approved';
        $student->save();
        Log::info('Updated students table', ['student_id' => $id]);

        // Update enrollment status in student_details table
        $studentDetails = StudentDetails::where('user_id', $student->user_id)->first();
        if ($studentDetails) {
            $studentDetails->enrollment_status = 'Enrollment Approved';
            $studentDetails->save();
            Log::info('Updated student_details table', ['user_id' => $student->user_id]);
        }

        DB::commit();
        return response()->json(['message' => 'Enrollment approved by admin.']);
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Failed to approve enrollment', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Failed to approve enrollment.'], 500);
    }
}



public function getApprovedEnrollments()
{
    try {
        $approvedEnrollments = StudentDetails::where('enrollment_status', 'Enrollment Approved')->get();
        return response()->json($approvedEnrollments);
    } catch (\Exception $e) {
        Log::error('Failed to fetch approved enrollments', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Failed to fetch approved enrollments.'], 500);
    }
}





}
