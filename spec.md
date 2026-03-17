# CourseAdmission.in Bihar

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full one-page website for free Bihar student admission guidance
- Lead capture form that stores submissions in Motoko backend
- All sections: Header, Hero, Courses, DRCC Guide, How It Works, Lead Form, Why Choose Us, Testimonials, WhatsApp Community, Footer

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- `LeadSubmission` record type: name, mobile, district, stream, percentage, course, needsDRCC, entranceExam, timestamp
- `submitLead(lead)` public func to store lead
- `getLeads()` admin func to retrieve all leads (no auth for now)

### Frontend
- Sticky header with logo and nav links (smooth scroll)
- Hero section with headline, sub-headline, badge, CTA button
- Courses section with cards (BCA, BBA, B.Com, B.Sc, Diploma)
- DRCC/Student Credit Card section with benefits list
- How It Works section with 4-step process
- Lead capture form with all specified fields, submits to backend, shows thank-you
- Why Choose Us section with 5 points
- Testimonials section with 3 cards
- WhatsApp Community section
- Footer with contact, links, social icons
- Saffron/orange and blue color scheme, mobile responsive
