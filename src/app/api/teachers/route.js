import { getTeachers } from "@/lib/teachers/actions";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const teachers = await getTeachers();
        return NextResponse.json(teachers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
    }
}
