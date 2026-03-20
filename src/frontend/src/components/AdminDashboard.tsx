import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Course,
  EntranceExam,
  Stream,
  useGetAllLeads,
} from "@/hooks/useQueries";
import { Download, GraduationCap, LogOut, Shield } from "lucide-react";
import { useState } from "react";

const ADMIN_PIN = "RG2024";
const STORAGE_KEY = "rg_admin_auth";

function formatStream(stream: Stream): string {
  switch (stream) {
    case Stream.science:
      return "Science";
    case Stream.commerce:
      return "Commerce";
    case Stream.arts:
      return "Arts";
    default:
      return String(stream);
  }
}

function formatCourse(course: Course, otherText?: string): string {
  switch (course) {
    case Course.bca:
      return "BCA";
    case Course.bba:
      return "BBA";
    case Course.bcom:
      return "B.Com";
    case Course.bsc:
      return "B.Sc";
    case Course.btech:
      return "B.Tech";
    case Course.diploma:
      return "Diploma";
    case Course.agriculture:
      return "Agriculture";
    case Course.pharmacy:
      return "Pharmacy";
    case Course.llb:
      return "LLB";
    case Course.mba:
      return "MBA";
    case Course.other:
      return otherText ? `Other: ${otherText}` : "Other";
    default:
      return String(course);
  }
}

function formatExam(exam: EntranceExam): string {
  switch (exam) {
    case EntranceExam.jee:
      return "JEE";
    case EntranceExam.neet:
      return "NEET";
    case EntranceExam.cuet:
      return "CUET";
    case EntranceExam.none:
      return "None";
    default:
      return String(exam);
  }
}

function PinLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      localStorage.setItem(STORAGE_KEY, "true");
      onSuccess();
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-admin-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">
            Admin Access
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            RG ARNAV EDU CONSULTANCY
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pin-input"
                className="text-sm font-medium text-navy mb-1.5 block"
              >
                Enter PIN
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter admin PIN"
                className={`text-center text-lg tracking-widest ${error ? "border-red-500" : ""}`}
                id="pin-input"
                data-ocid="admin.pin.input"
                autoFocus
              />
              {error && (
                <p
                  className="text-red-500 text-xs mt-1 text-center"
                  data-ocid="admin.pin.error_state"
                >
                  Incorrect PIN. Please try again.
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-navy hover:bg-blue text-white font-semibold"
              data-ocid="admin.login.submit_button"
            >
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );

  const { data: leads = [], isLoading, isError } = useGetAllLeads();

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <PinLogin onSuccess={() => setIsLoggedIn(true)} />;
  }

  const scienceCount = leads.filter(
    (l) => l.twelfthStream === Stream.science,
  ).length;
  const commerceCount = leads.filter(
    (l) => l.twelfthStream === Stream.commerce,
  ).length;
  const artsCount = leads.filter((l) => l.twelfthStream === Stream.arts).length;

  const downloadCSV = () => {
    const headers = [
      "#",
      "Full Name",
      "Mobile",
      "District",
      "Stream",
      "12th %",
      "Course",
      "DRCC Support",
      "Entrance Exam",
    ];
    const rows = leads.map((lead, i) => [
      i + 1,
      lead.fullName,
      lead.mobileNumber,
      lead.district,
      formatStream(lead.twelfthStream),
      String(lead.twelfthPercentage),
      formatCourse(lead.interestedCourse, lead.otherCourseText),
      lead.needsDrccSupport ? "Yes" : "No",
      formatExam(lead.entranceExam),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-white/60 text-xs">RG ARNAV EDU CONSULTANCY</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white/80 hover:text-white hover:bg-white/10"
            data-ocid="admin.logout.button"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Total Leads
              </p>
              <p
                className="text-3xl font-bold text-navy mt-1"
                data-ocid="admin.total.card"
              >
                {leads.length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Science
              </p>
              <p
                className="text-3xl font-bold text-blue mt-1"
                data-ocid="admin.science.card"
              >
                {scienceCount}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Commerce
              </p>
              <p
                className="text-3xl font-bold text-green mt-1"
                data-ocid="admin.commerce.card"
              >
                {commerceCount}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Arts
              </p>
              <p
                className="text-3xl font-bold text-orange mt-1"
                data-ocid="admin.arts.card"
              >
                {artsCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-navy text-lg">
                Student Submissions
              </CardTitle>
              <Button
                onClick={downloadCSV}
                size="sm"
                className="bg-blue hover:bg-navy text-white"
                disabled={leads.length === 0}
                data-ocid="admin.download.button"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading && (
              <div
                className="flex items-center justify-center py-16 text-muted-foreground"
                data-ocid="admin.table.loading_state"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-navy border-t-transparent mr-3" />
                Loading submissions...
              </div>
            )}
            {isError && (
              <div
                className="text-center py-16 text-red-500"
                data-ocid="admin.table.error_state"
              >
                Failed to load data. Please refresh.
              </div>
            )}
            {!isLoading && !isError && leads.length === 0 && (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="admin.table.empty_state"
              >
                No submissions yet.
              </div>
            )}
            {!isLoading && !isError && leads.length > 0 && (
              <div className="overflow-x-auto" data-ocid="admin.leads.table">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="w-10 text-navy font-semibold">
                        #
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        Full Name
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        Mobile
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        District
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        Stream
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        12th %
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        Course
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        DRCC
                      </TableHead>
                      <TableHead className="text-navy font-semibold">
                        Exam
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead, i) => (
                      <TableRow
                        key={`${lead.mobileNumber}-${i}`}
                        className="hover:bg-muted/30"
                        data-ocid={`admin.leads.item.${i + 1}`}
                      >
                        <TableCell className="text-muted-foreground text-sm">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {lead.fullName}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/91${lead.mobileNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue hover:underline"
                          >
                            {lead.mobileNumber}
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">
                          {lead.district}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              lead.twelfthStream === Stream.science
                                ? "bg-blue/10 text-blue"
                                : lead.twelfthStream === Stream.commerce
                                  ? "bg-green/10 text-green"
                                  : "bg-orange/10 text-orange"
                            }`}
                          >
                            {formatStream(lead.twelfthStream)}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {String(lead.twelfthPercentage)}%
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatCourse(
                            lead.interestedCourse,
                            lead.otherCourseText,
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs font-medium ${
                              lead.needsDrccSupport
                                ? "text-green"
                                : "text-muted-foreground"
                            }`}
                          >
                            {lead.needsDrccSupport ? "✓ Yes" : "No"}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatExam(lead.entranceExam)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
