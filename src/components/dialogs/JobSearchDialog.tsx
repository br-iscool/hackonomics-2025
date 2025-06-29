import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSnapshot } from "valtio";
import { state } from "@/game/state";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface JobListing {
    role: string;
    salary: number;
    location: string;
    requirements: string;
    educationLevel: "Highschool" | "Vocational" | "Undergrad" | "Grad";
    field?: "Medicine" | "Law";
}

const jobListings: JobListing[] = [
    // High school jobs
    { role: "Cashier", salary: 25000, location: "MacDenny's", requirements: "High school diploma", educationLevel: "Highschool" },
    { role: "Janitor", salary: 23000, location: "IHops", requirements: "High school diploma", educationLevel: "Highschool" },
    { role: "Security Guard", salary: 28000, location: "Sofaway", requirements: "High school diploma", educationLevel: "Highschool" },
    
    // Trade school jobs
    { role: "Electrician", salary: 55000, location: "", requirements: "Trade school degree", educationLevel: "Vocational" },
    { role: "Plumber", salary: 52000, location: "", requirements: "Trade school degree", educationLevel: "Vocational" },
    { role: "HVAC Technician", salary: 48000, location: "", requirements: "Trade school degree", educationLevel: "Vocational" },
    { role: "Automotive Mechanic", salary: 45000, location: "", requirements: "Trade school degree", educationLevel: "Vocational" },
    
    // Undergraduate jobs
    { role: "Software Developer", salary: 75000, location: "", requirements: "University degree", educationLevel: "Undergrad" },
    { role: "Marketing Coordinator", salary: 45000, location: "", requirements: "University degree", educationLevel: "Undergrad" },
    { role: "Business Analyst", salary: 65000, location: "", requirements: "University degree", educationLevel: "Undergrad" },
    { role: "Teacher", salary: 42000, location: "", requirements: "University degree", educationLevel: "Undergrad" },
    { role: "Accountant", salary: 55000, location: "", requirements: "University degree", educationLevel: "Undergrad" },
    
    // Graduate jobs
    { role: "Doctor", salary: 200000, location: "", requirements: "Medical degree", educationLevel: "Grad", field: "Medicine" },
    { role: "Lawyer", salary: 120000, location: "", requirements: "Law degree", educationLevel: "Grad", field: "Law" },
    { role: "Research Scientist", salary: 95000, location: "", requirements: "Graduate degree", educationLevel: "Grad" },
];

export function JobSearchDialog({ open, onOpenChange, onJobSelected }: { 
    open: boolean; 
    onOpenChange: (open: boolean) => void;
    onJobSelected: (message: string) => void;
}) {
    const snap = useSnapshot(state);

    const getHighestEducationLevel = () => {
        if (snap.education.level === "Grad" && !snap.education.inSchooling) return "Grad";
        if (snap.education.level === "Undergrad" && !snap.education.inSchooling) return "Undergrad";
        if (snap.education.level === "Vocational" && !snap.education.inSchooling) return "Vocational";
        return "Highschool";
    };

    // Check education field
    const availableJobs = jobListings.filter(job => {
        const playerEducationLevel = getHighestEducationLevel();

        if (job.educationLevel !== playerEducationLevel) {
            return false;
        }
        if (job.educationLevel === "Grad" && job.field) {
            return snap.education.field === job.field;
        }
        return true;
    });

    const handleJobSelect = (job: JobListing) => {
        state.job = {
            role: job.role,
            salary: job.salary,
            yearsEmployed: 0
        };

        onOpenChange(false);
        onJobSelected(`Congratulations! You've been hired as a ${job.role} at ${job.location} with a starting salary of $${job.salary.toLocaleString()} per year!`);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FaBriefcase className="text-muted-foreground" /> Available Jobs
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4">
                    <div className="grid gap-3">
                        {availableJobs.map((job, index) => (
                            <Card key={index} className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-lg">{job.role}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <FaLocationDot />
                                                <h6 className="text-sm">{job.location}</h6>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <FaGraduationCap />
                                                <span>{job.requirements}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-medium">${job.salary.toLocaleString()} / year</span>
                                            </div>
                                        </div>
                                        <Button className="cursor-pointer" onClick={() => handleJobSelect(job)}>
                                            Apply
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}