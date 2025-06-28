import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FaGraduationCap, FaSchool, FaBookOpen, FaCalendar, FaDollarSign } from "react-icons/fa";

interface Education {
	inSchooling: boolean;
	level: "Highschool" | "Vocational" | "Undergrad" | "Grad";
	tuition?: number;
	field?: string;
	yearsUntilGrad?: number;
}

export default function EducationInfo({ education }: { education: Education }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-40 h-16 text-lg" variant="default">
					{"Education"}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FaGraduationCap className="h-5 w-5" /> Education Overview
					</DialogTitle>
				</DialogHeader>

				<div className="p-4 space-y-6">
					<div className="flex items-center gap-3">
						<FaSchool className="text-muted-foreground" />
						<span className="font-medium">Currently Enrolled:</span>
						<span>{education.inSchooling ? "Yes" : "No"}</span>
					</div>
					<div className="flex items-center gap-3">
						<FaBookOpen className="text-muted-foreground" />
						<span className="font-medium">Level:</span>
						<span>{education.level}</span>
					</div>
					{education.field && (
						<div className="flex items-center gap-3">
							<FaBookOpen className="text-muted-foreground" />
							<span className="font-medium">Field of Study:</span>
							<span>{education.field}</span>
						</div>
					)}
					{education.tuition !== undefined && (
						<div className="flex items-center gap-3">
							<FaDollarSign className="text-muted-foreground" />
							<span className="font-medium">Tuition:</span>
							<span>${education.tuition.toLocaleString()}</span>
						</div>
					)}
					{education.yearsUntilGrad !== undefined && (
						<div className="flex items-center gap-3">
							<FaCalendar className="text-muted-foreground" />
							<span className="font-medium">Years Until Graduation:</span>
							<span>{education.yearsUntilGrad}</span>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
