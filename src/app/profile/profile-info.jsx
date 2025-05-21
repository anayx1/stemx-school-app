import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { School, GraduationCap, User, Pen } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileInfo({ student }) {
  return (
    <Card className="border-0 shadow-none bg-transparent z-50 relative ">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-6">
          <div>
            <Avatar className="h-auto w-32 ">
              <AvatarImage
                src={student.avatar || "/avatar.png"}
                alt={student.name}
                className="rounded-full shadow-white"
              />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex h-full w-full md:w-auto lg:w-auto">
            <div className="bg-white shadow-md rounded-lg p-4 h-full w-full ">
              <div className="flex flex-col text-center md:text-left">
                <h3 className=" text-2xl font-bold">{student.name}</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 w-full">
                    <School className="h-5 w-5 text-gray-500" />
                    <span>{student.school}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    <span>{student.grade}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-5 right-5 ">
          <button className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            {/* <User className="h-4 w-4" /> */}

            {/* <Pen className="h-4 w-4" /> */}
            <EditProfileModal student={student} />

            {/* Edit */}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
