import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import Emphasis from "@/components/text/Emphasis";
import {Button} from "@/components/ui/button";
import React from "react";
import {Loader2} from "lucide-react";

type ContinueSaveDialogProps = {
    open: boolean,
    onClose: () => void,
    onSave: () => void,
    saving: boolean
}
export default function ContinueSaveDialog({ open, onClose, onSave, saving }: ContinueSaveDialogProps) {
    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                onClose()
            }
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"text-yellow-500"}>Are you sure you want to save?</DialogTitle>
                    <DialogDescription>
                        Please note that <Emphasis>you cannot restore older versions</Emphasis>, which means that once
                        you save this survey, it will be applied to the server immediately.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose  asChild>
                        <Button onClick={onClose} type="button" variant="secondary" disabled={saving} className={"my-2 md:my-0"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    {saving ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                        </Button>
                    ) : (
                        <Button onClick={onSave} type="button" variant="destructive">
                            Confirm
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}