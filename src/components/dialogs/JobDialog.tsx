import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FaBriefcase, FaDollarSign, FaRegCalendarCheck } from "react-icons/fa";

export interface Job {
	role: string;
	salary: number;
	yearsEmployed: number;
}

export default function JobDialog({ job }: { job: Job }) {
	return (
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
				</div>
			</DialogContent>
		</Dialog>
	);
}
