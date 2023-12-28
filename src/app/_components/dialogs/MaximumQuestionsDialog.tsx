import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {MAXIMUM_QUESTIONS} from "@/constants/maximums";
import {Button} from "@/components/ui/button";
import React from "react";
import Emphasis from "@/components/text/Emphasis";

export default function MaximumQuestionsDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"text-red-500"}>You cannot add any more questions.</DialogTitle>
                    <DialogDescription>
                        Our systems currently support up to <Emphasis>{MAXIMUM_QUESTIONS} questions</Emphasis>.
                        We're working to expand this limit soon. Thanks for your understanding and stay tuned for updates!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button onClick={onClose} type="button" variant="secondary">
                            Okay
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}