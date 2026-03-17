import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  Facebook,
  GraduationCap,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import {
  Course,
  EntranceExam,
  Stream,
  useSubmitLead,
} from "./hooks/useQueries";

const BIHAR_DISTRICTS = [
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
];

const COURSES = [
  {
    value: Course.bca,
    label: "BCA",
    duration: "3 Years",
    careers: "Software Developer, IT, Web Designer",
    icon: "💻",
  },
  {
    value: Course.bba,
    label: "BBA",
    duration: "3 Years",
    careers: "Management, Marketing, Sales",
    icon: "📊",
  },
  {
    value: Course.bcom,
    label: "B.Com",
    duration: "3 Years",
    careers: "Accounts, Banking, Finance",
    icon: "🏦",
  },
  {
    value: Course.bsc,
    label: "B.Sc",
    duration: "3 Years",
    careers: "Research, Teaching, Lab Work",
    icon: "🔬",
  },
  {
    value: Course.diploma,
    label: "Diploma",
    duration: "2-3 Years",
    careers: "Technical Jobs, Engineering Assistant",
    icon: "🔧",
  },
];

const WHY_CHOOSE = [
  {
    icon: GraduationCap,
    title: "Free Personal Guidance",
    desc: "No charges for counselling",
  },
  {
    icon: Wallet,
    title: "DRCC Experts",
    desc: "We specialize in Bihar Student Credit Card",
  },
  {
    icon: Building2,
    title: "Affordable College Options",
    desc: "We help you find low-fee colleges",
  },
  {
    icon: Users,
    title: "Proven Track Record",
    desc: "Helped 100+ students last year",
  },
  { icon: Clock, title: "Quick Response", desc: "We reply within 24 hours" },
];

const TESTIMONIALS = [
  {
    text: "I was confused after 12th. CourseAdmission.in helped me choose BCA and also guided me through DRCC loan. Got admission in a good college.",
    name: "Ravi Kumar",
    location: "Patna",
    initial: "R",
  },
  {
    text: "Very helpful guidance. They explained all course options and helped me find an affordable BBA college. Highly recommended.",
    name: "Priya Singh",
    location: "Gaya",
    initial: "P",
  },
  {
    text: "The DRCC guidance was excellent. I got 0% interest loan for my B.Sc admission. Thank you!",
    name: "Ankit Raj",
    location: "Muzaffarpur",
    initial: "A",
  },
];

const HOW_STEPS = [
  {
    num: 1,
    title: "Fill the Form",
    desc: "Tell us your stream, percentage, and preferred course",
  },
  {
    num: 2,
    title: "Get Course Recommendations",
    desc: "We suggest the best courses and colleges based on your profile",
  },
  {
    num: 3,
    title: "DRCC / Loan Support",
    desc: "We guide you on education loan options including DRCC",
  },
  {
    num: 4,
    title: "Admission Confirmed",
    desc: "We help you complete the admission process smoothly",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    district: "",
    twelfthStream: "" as Stream | "",
    twelfthPercentage: "",
    interestedCourse: "" as Course | "",
    needsDrccSupport: "",
    entranceExam: "" as EntranceExam | "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.mobileNumber ||
      !form.district ||
      !form.twelfthStream ||
      !form.twelfthPercentage ||
      !form.interestedCourse ||
      !form.needsDrccSupport ||
      !form.entranceExam
    ) {
      return;
    }
    try {
      await submitLead.mutateAsync({
        fullName: form.fullName,
        mobileNumber: form.mobileNumber,
        district: form.district,
        twelfthStream: form.twelfthStream as Stream,
        twelfthPercentage: Number(form.twelfthPercentage),
        interestedCourse: form.interestedCourse as Course,
        needsDrccSupport: form.needsDrccSupport === "yes",
        entranceExam: form.entranceExam as EntranceExam,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Courses", id: "courses" },
    { label: "DRCC Guide", id: "drcc-guide" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen font-poppins">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-md" id="home">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-base sm:text-lg">
                <span className="text-navy">CourseAdmission.in</span>{" "}
                <span className="text-orange">Bihar</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={`nav.${link.id}.link`}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-foreground hover:text-orange transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="header.get_guidance.button"
                onClick={() => scrollTo("contact")}
                className="hidden sm:inline-flex bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-dark transition-colors shadow-sm"
              >
                Get Free Guidance
              </button>
              {/* Mobile menu toggle */}
              <button
                type="button"
                data-ocid="nav.menu.toggle"
                className="md:hidden p-2 rounded-md text-foreground"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.mobile.${link.id}.link`}
                onClick={() => {
                  scrollTo(link.id);
                  setMenuOpen(false);
                }}
                className="text-sm font-medium text-foreground hover:text-orange text-left py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              data-ocid="header.mobile.get_guidance.button"
              onClick={() => {
                scrollTo("contact");
                setMenuOpen(false);
              }}
              className="bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold w-full text-center"
            >
              Get Free Guidance
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden bg-navy min-h-[580px] flex items-center"
        style={{
          background: "linear-gradient(105deg, #0B2C4A 0%, #0A3A63 100%)",
        }}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/40 text-orange rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              DRCC / Student Credit Card Support Available (0% Interest Loan up
              to ₹4 Lakhs)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Confused After 12th?{" "}
              <span className="text-orange">We Help You Choose</span> the Right
              Course & College
            </h1>

            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
              Free Admission Guidance for Bihar Students |{" "}
              <span className="font-semibold text-white">
                BCA | BBA | B.Com | B.Sc | Diploma
              </span>
            </p>

            <button
              type="button"
              data-ocid="hero.get_guidance.button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 bg-orange text-white px-7 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-[oklch(0.67_0.17_55)] transition-all duration-200"
            >
              Get Free Guidance – Fill the Form
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative right side circle */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center opacity-10">
          <div className="w-96 h-96 rounded-full border-[3px] border-white" />
          <div className="absolute w-64 h-64 rounded-full border-[3px] border-orange" />
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Courses <span className="text-orange">We Help You With</span>
            </h2>
            <p className="text-muted-foreground">
              Choose the right career path for your future
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            {COURSES.map((c, i) => (
              <div
                key={c.value}
                data-ocid={`courses.item.${i + 1}`}
                className="bg-white rounded-xl border border-border card-shadow p-5 flex flex-col items-center text-center hover:border-orange hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-foreground text-lg group-hover:text-orange transition-colors">
                  {c.label}
                </h3>
                <span className="text-xs text-muted-foreground mb-2">
                  {c.duration}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.careers}
                </p>
                <button
                  type="button"
                  data-ocid={`courses.explore.${i + 1}.button`}
                  onClick={() => scrollTo("contact")}
                  className="mt-3 text-orange text-sm font-semibold flex items-center gap-1 hover:underline"
                >
                  Explore <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground italic bg-muted rounded-lg inline-block px-5 py-2">
              💡 We also guide for other professional courses – just ask us!
            </p>
          </div>
        </div>
      </section>

      {/* DRCC */}
      <section id="drcc-guide">
        {/* Blue band header */}
        <div className="drcc-band py-6 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Bihar Student Credit Card (DRCC) –{" "}
              <span className="text-orange">0% Interest Loan</span>
            </h2>
          </div>
        </div>

        <div className="bg-muted py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl card-shadow p-8 sm:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 text-6xl hidden md:block">🎓</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-5">
                    Benefits of DRCC Support
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Loan up to ₹4 Lakhs at 0% interest",
                      "Available for all Bihar students",
                      "Covers tuition fees, hostel, books, laptop",
                      "Simple application process through DRCC portal",
                      "Complete guidance through entire process",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm sm:text-base">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    data-ocid="drcc.get_guidance.button"
                    onClick={() => scrollTo("contact")}
                    className="inline-flex items-center gap-2 bg-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-[oklch(0.67_0.17_55)] transition-colors shadow-md"
                  >
                    Get DRCC Guidance Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              How Our <span className="text-orange">Admission Guidance</span>{" "}
              Works
            </h2>
            <p className="text-muted-foreground">
              Simple 4-step process to get you admitted
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {HOW_STEPS.map((step) => (
              <div
                key={step.num}
                data-ocid={`how.step.${step.num}`}
                className="flex items-start gap-5 bg-muted rounded-xl p-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="contact" className="py-16 lg:py-20 orange-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Get Free Admission Guidance Now
            </h2>
            <p className="text-white/85 text-sm sm:text-base">
              Fill this form and we'll contact you within 24 hours with course &
              college suggestions
            </p>
          </div>

          <div
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
            data-ocid="lead.modal"
          >
            {submitted ? (
              <div className="text-center py-10" data-ocid="form.success_state">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Thank You! 🎉
                </h3>
                <p className="text-muted-foreground">
                  Your enquiry has been submitted. We'll contact you within 24
                  hours with personalized guidance.
                </p>
                <button
                  type="button"
                  data-ocid="form.submit_another.button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      fullName: "",
                      mobileNumber: "",
                      district: "",
                      twelfthStream: "",
                      twelfthPercentage: "",
                      interestedCourse: "",
                      needsDrccSupport: "",
                      entranceExam: "",
                    });
                  }}
                  className="mt-6 text-orange font-semibold hover:underline text-sm"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-semibold text-foreground mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      data-ocid="lead.fullname.input"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="mobile"
                      className="text-sm font-semibold text-foreground mb-1.5 block"
                    >
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      data-ocid="lead.mobile.input"
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={form.mobileNumber}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, mobileNumber: e.target.value }))
                      }
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                      District – Bihar *
                    </Label>
                    <Select
                      value={form.district}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, district: v }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="lead.district.select"
                        className="h-11"
                      >
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {BIHAR_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                      12th Stream *
                    </Label>
                    <Select
                      value={form.twelfthStream}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, twelfthStream: v as Stream }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="lead.stream.select"
                        className="h-11"
                      >
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Stream.science}>Science</SelectItem>
                        <SelectItem value={Stream.commerce}>
                          Commerce
                        </SelectItem>
                        <SelectItem value={Stream.arts}>Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label
                      htmlFor="percentage"
                      className="text-sm font-semibold text-foreground mb-1.5 block"
                    >
                      12th Percentage *
                    </Label>
                    <Input
                      id="percentage"
                      data-ocid="lead.percentage.input"
                      type="number"
                      min={0}
                      max={100}
                      required
                      placeholder="e.g. 75"
                      value={form.twelfthPercentage}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          twelfthPercentage: e.target.value,
                        }))
                      }
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                      Interested Course *
                    </Label>
                    <Select
                      value={form.interestedCourse}
                      onValueChange={(v) =>
                        setForm((p) => ({
                          ...p,
                          interestedCourse: v as Course,
                        }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="lead.course.select"
                        className="h-11"
                      >
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Course.bca}>BCA</SelectItem>
                        <SelectItem value={Course.bba}>BBA</SelectItem>
                        <SelectItem value={Course.bcom}>B.Com</SelectItem>
                        <SelectItem value={Course.bsc}>B.Sc</SelectItem>
                        <SelectItem value={Course.diploma}>Diploma</SelectItem>
                        <SelectItem value={Course.other}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Radio fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">
                      Need DRCC / Student Credit Card Support? *
                    </Label>
                    <div className="flex gap-5">
                      {["yes", "no"].map((v) => (
                        <label
                          key={v}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="drcc"
                            data-ocid={`lead.drcc.${v}.radio`}
                            value={v}
                            checked={form.needsDrccSupport === v}
                            onChange={() =>
                              setForm((p) => ({ ...p, needsDrccSupport: v }))
                            }
                            className="w-4 h-4 accent-orange"
                            required
                          />
                          <span className="text-sm capitalize font-medium">
                            {v === "yes" ? "Yes" : "No"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">
                      Appeared in Entrance Exam? *
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: EntranceExam.jee, label: "JEE" },
                        { value: EntranceExam.neet, label: "NEET" },
                        { value: EntranceExam.cuet, label: "CUET" },
                        { value: EntranceExam.none, label: "None" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="entrance"
                            data-ocid={`lead.entrance.${opt.value}.radio`}
                            value={opt.value}
                            checked={form.entranceExam === opt.value}
                            onChange={() =>
                              setForm((p) => ({
                                ...p,
                                entranceExam: opt.value as EntranceExam,
                              }))
                            }
                            className="w-4 h-4 accent-orange"
                            required
                          />
                          <span className="text-sm font-medium">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {submitLead.isError && (
                  <div
                    data-ocid="form.error_state"
                    className="bg-red-50 text-red-700 rounded-lg p-3 text-sm"
                  >
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="lead.submit_button"
                  disabled={submitLead.isPending}
                  className="w-full bg-orange text-white py-3.5 rounded-xl font-bold text-base hover:bg-[oklch(0.67_0.17_55)] transition-colors shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitLead.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Fill the Form Now"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Why Students <span className="text-orange">Trust</span>{" "}
              CourseAdmission.in Bihar
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <div
                key={item.title}
                data-ocid={`why.item.${i + 1}`}
                className="bg-white rounded-xl card-shadow p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              What Students <span className="text-orange">Say About Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                className="bg-white rounded-xl border border-border card-shadow p-6 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-orange fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center font-bold text-orange">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP COMMUNITY */}
      <section className="py-16 lg:py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-6">
            <SiWhatsapp className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Join Our <span className="text-green-600">WhatsApp Community</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get instant admission updates, DRCC news, college information, and
            career tips directly on WhatsApp
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
            {[
              "Daily admission updates",
              "DRCC scheme alerts",
              "College application deadlines",
              "Free guidance posts",
            ].map((benefit) => (
              <div
                key={benefit}
                className="bg-white rounded-lg p-3 border border-green-100 text-xs font-medium text-foreground flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
          <a
            href="/"
            data-ocid="whatsapp.join.button"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-green-600 transition-colors shadow-lg"
          >
            <SiWhatsapp className="w-5 h-5" />
            Join WhatsApp Community
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-base">
                  CourseAdmission.in Bihar
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Free admission guidance for Bihar students after 12th. We help
                you choose the right course and college.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                  [Your Number]
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                  [Your Email]
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange flex-shrink-0" />
                  Serving: Bihar Students
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Home", id: "home" },
                  { label: "Courses", id: "courses" },
                  { label: "DRCC Guide", id: "drcc-guide" },
                  { label: "Contact", id: "contact" },
                  { label: "Privacy Policy", id: "home" },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      data-ocid={`footer.${link.id}.link`}
                      onClick={() => scrollTo(link.id)}
                      className="text-white/70 hover:text-orange transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="/"
                  data-ocid="footer.facebook.link"
                  className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="/"
                  data-ocid="footer.instagram.link"
                  className="w-10 h-10 bg-white/10 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="/"
                  data-ocid="footer.whatsapp.link"
                  className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              © {new Date().getFullYear()} CourseAdmission.in Bihar. All rights
              reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with{" "}
              <Heart className="w-3.5 h-3.5 text-orange fill-current" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
