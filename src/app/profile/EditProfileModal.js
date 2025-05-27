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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen } from "lucide-react";
import { useState } from "react";

// Avatar options - you can replace these with your own avatar images
const AVATAR_OPTIONS = [
    "/avatar.png",
    "/avatar2.png",
    "/avatar3.png",
    "/avatar4.png",
    "/avatar5.png"
];

export default function EditProfileModal({ student }) {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState(student.phone || "");
    const [selectedAvatar, setSelectedAvatar] = useState(student.avatar || AVATAR_OPTIONS[0]);

    const handleSubmit = async () => {
        const res = await fetch(`/api/student/${student.id}`, {
            method: "POST",
            body: JSON.stringify({
                phone,
                avatar: selectedAvatar
            }),
        });

        const result = await res.json();
        if (result) {
            setOpen(false);
            // You might want to refresh the page or update the parent component here
            window.location.reload(); // Simple refresh - you can implement a better state update
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Pen className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-2">
                    {/* Avatar Selection */}
                    <div>
                        <label className="text-sm font-semibold mb-3 block">Choose Avatar</label>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {AVATAR_OPTIONS.map((avatarUrl, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer transition-all duration-200 ${selectedAvatar === avatarUrl
                                        ? "ring-4 ring-blue-500 ring-offset-2 rounded-full"
                                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 rounded-full"
                                        }`}
                                    onClick={() => setSelectedAvatar(avatarUrl)}
                                >
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={avatarUrl}
                                            alt={`Avatar ${index + 1}`}
                                            className="rounded-full"
                                        />
                                        <AvatarFallback>
                                            A{index + 1}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>
                    </div>

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
                        <Input value={phone || '+91-9999999999'} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <Button onClick={handleSubmit} className="w-full">Save Changes</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}