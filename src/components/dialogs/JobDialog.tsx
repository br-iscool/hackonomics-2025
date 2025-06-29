import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSnapshot } from "valtio";
import { FaBriefcase, FaDollarSign, FaRegCalendarCheck } from "react-icons/fa";
import EventDialog from "./EventDialog";
import { uistate } from "@/state";

export interface JobDialogProps {
	role: string;
	salary: number;
	yearsEmployed: number;
}

export default function JobDialog({ job }: { job: JobDialogProps | null }) {
	const uisnap = useSnapshot(uistate);

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
									onClick={() => uistate.showJobSearch = true}
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
									onClick={() => uistate.showJobSearch = true}
									className="w-full"
								>
									Find a Job
								</Button>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{uisnap.jobResult && (
				<EventDialog
					dialog={{
						title: "Result",
						body: <p>{uisnap.jobResult}</p>,
						buttons: [{ 
                            label: "Continue", 
                            onClick: () => {
                                uistate.showJobSearch = false;
                                uistate.jobResult = null;
                            }, 
                            disabled: false 
                        }],
					}}
					onClose={() => uistate.jobResult = null}
				/>
			)}
		</>
	);
}
