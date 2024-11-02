<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Validator;

class CurriculumController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'courses.*.code' => 'required|string',
            'courses.*.title' => 'required|string',
            'courses.*.CreditUnitsLec' => 'required|numeric',
            'courses.*.CreditUnitsLab' => 'required|numeric',
            'courses.*.ContactHoursLec' => 'required|numeric',
            'courses.*.ContactHoursLab' => 'required|numeric',
            'courses.*.Prerequisite' => 'nullable|string',
            'courses.*.program' => 'required|string',
            'courses.*.semester' => 'required|string',
            'courses.*.year' => 'required|numeric|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $courses = $request->input('courses');
    
        foreach ($courses as $courseData) {
            // Check for required fields
            if (empty($courseData['program']) || empty($courseData['semester']) || $courseData['year'] <= 0) {
                // Skip this course and log the issue
                \Log::warning('Skipping course due to missing fields:', $courseData);
                continue; // Skip to the next iteration
            }
    
            if (isset($courseData['id']) && !empty($courseData['id'])) {
                // Update existing course
                Course::where('id', $courseData['id'])->update([
                    'code' => $courseData['code'],
                    'title' => $courseData['title'],
                    'CreditUnitsLec' => $courseData['CreditUnitsLec'],
                    'CreditUnitsLab' => $courseData['CreditUnitsLab'],
                    'ContactHoursLec' => $courseData['ContactHoursLec'],
                    'ContactHoursLab' => $courseData['ContactHoursLab'],
                    'Prerequisite' => $courseData['Prerequisite'],
                    'program' => $courseData['program'],
                    'semester' => $courseData['semester'],
                    'year' => $courseData['year'],
                ]);
            } else {
                // Create a new course
                Course::create($courseData); // Assuming courseData contains all necessary fields
            }
        }
    
        return response()->json(['message' => 'Curriculum updated successfully'], 200);
    }

    public function index(Request $request)
{
    $query = Course::query();

    if ($request->has('program')) {
        $query->where('program', $request->input('program'));
    }
    
    if ($request->has('semester')) {
        $query->where('semester', $request->input('semester'));
    }
    
    if ($request->has('year')) {
        $query->where('year', $request->input('year'));
    }

    $courses = $query->get();
    return response()->json($courses);
}

}