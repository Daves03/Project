<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

    public function enroll(Request $request)
    {
        Log::info('Enrollment request received', $request->all());
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

        
        DB::beginTransaction();

        try {
            
            $student = Student::create($validatedData);

            
            $guardian = $student->guardian()->create([
                'name' => $validatedData['guardianName'],
                'phone' => $validatedData['guardianPhone'],
                'religion' => $validatedData['religion'],
            ]);

            
            $address = $student->address()->create([
                'house_number' => $validatedData['houseNumber'],
                'street' => $validatedData['street'],
                'subdivision' => $validatedData['subdivision'],
                'barangay' => $validatedData['barangay'],
                'municipality' => $validatedData['municipality'],
                'zip_code' => $validatedData['zipCode'],
            ]);

            
            $payment = $student->payment()->create([
                'mobile_number' => $validatedData['mobileNumber'],
                'amount' => $validatedData['amount'],
                'sender_name' => $validatedData['senderName'],
                'reference_number' => $validatedData['referenceNumber'],
            ]);

            
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
}