# CourseAdmission.in Bihar

## Current State
The app has a full one-page website for RG ARNAV EDU CONSULTANCY with a student lead capture form (submitLead). The backend stores leads with: fullName, mobileNumber, district, twelfthStream, twelfthPercentage, interestedCourse, otherCourseText, needsDrccSupport, entranceExam. The backend has getAllLeads() query function. No admin panel exists yet.

## Requested Changes (Diff)

### Add
- Admin Dashboard page at /admin route (password-protected with a simple hardcoded PIN "RG2024")
- Table showing all student submissions: Name, Mobile, District, Stream, %, Course, DRCC Support, Entrance Exam
- Summary stats: total leads, stream breakdown
- Download/export as CSV button
- Mobile-responsive table with horizontal scroll

### Modify
- App.tsx to include /admin route

### Remove
- Nothing

## Implementation Plan
1. Create AdminDashboard component with PIN login ("RG2024") and leads table
2. Add /admin route in App.tsx
3. Wire getAllLeads() backend call to populate the table
4. Add CSV export functionality
