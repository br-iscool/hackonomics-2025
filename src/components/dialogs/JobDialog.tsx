import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaBriefcase, FaDollarSign, FaRegCalendarCheck } from "react-icons/fa";
import EventDialog from "./EventDialog";
import { JobSearchDialog } from "./JobSearchDialog";

export interface JobDialogProps {
	role: string;
	salary: number;
	yearsEmployed: number;
}

export default function JobDialog({ job }: { job: JobDialogProps | null }) {
	const [showJobSearch, setShowJobSearch] = useState(false);
	const [jobResult, setJobResult] = useState<string | null>(null);

	const handleJobSelected = (message: string) => {
		setJobResult(message);
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button className="w-40 h-16 text-lg" variant="default">
						{"Job"}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<FaBriefcase className="text-muted-foreground" /> Job Overview
						</DialogTitle>
					</DialogHeader>
					<div className="p-4 space-y-4">
						{job ? (
							<>
								<div className="flex items-center gap-3">
									<FaBriefcase className="text-muted-foreground" />
									<span className="font-medium">Role:</span>
									<span>{job.role}</span>
								</div>
								<div className="flex items-center gap-3">
									<FaDollarSign className="text-muted-foreground" />
									<span className="font-medium">Salary:</span>
									<span>${job.salary.toLocaleString()}</span>
								</div>
								<div className="flex items-center gap-3">
									<FaRegCalendarCheck className="text-muted-foreground" />
									<span className="font-medium">Years Employed:</span>
									<span>{job.yearsEmployed}</span>
								</div>
								<Button
									onClick={() => setShowJobSearch(true)}
									className="w-full mt-4"
									variant="outline"
								>
									Find a New Job
								</Button>
							</>
						) : (
							<>
								<div className="text-center text-muted-foreground py-4">
									You are currently unemployed
								</div>
								<Button
									onClick={() => setShowJobSearch(true)}
									className="w-full"
								>
									Find a Job
								</Button>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>

			<JobSearchDialog
				open={showJobSearch}
				onOpenChange={setShowJobSearch}
				onJobSelected={handleJobSelected}
			/>

			{jobResult && (
				<EventDialog
					dialog={{
						title: "Result",
						body: <p>{jobResult}</p>,
						buttons: [{ label: "Continue", onClick: () => setJobResult(null), disabled: false}],
					}}
					onClose={() => setJobResult(null)}
				/>
			)}
		</>
	);
}
