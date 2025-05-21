"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ student }) {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState(student.phone || "");

    const handleSubmit = async () => {
        const res = await fetch(`/api/student/${student.id}`, {
            method: "POST",
            body: JSON.stringify({ phone }),
        });

        const result = await res.json();
        if (result) {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Pen className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-semibold">Name</label>
                        <Input value={student.student_school?.student_name || "Alex Johnson"} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Class</label>
                        <Input value={student.class_assigned?.class_name || "11th Grade"} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">School</label>
                        <Input value={student.student_school?.school || "Westlake High School"} disabled />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Mobile Number</label>
                        <Input value={phone ||'+91-9999999999'} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
