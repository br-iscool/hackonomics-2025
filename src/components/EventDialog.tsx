import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DialogEntry {
	title: string;
	body: string;
	buttons: { label: string; onClick: () => void }[];
}

interface EventProps {
	dialog: DialogEntry;
	onClose: () => void;
}

export default function EventDialog({ dialog, onClose }: EventProps) {
	return (
		<AlertDialog
			open={true}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}>
			<AlertDialogContent className="max-w-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>{dialog.title}</AlertDialogTitle>
					<AlertDialogDescription dangerouslySetInnerHTML={{ __html: dialog.body }} />
				</AlertDialogHeader>
				<AlertDialogFooter className="flex justify-center gap-4 pt-4">
					{dialog.buttons.map((btn, i) => (
						<Button key={i} onClick={btn.onClick}>
							{btn.label}
						</Button>
					))}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
