"use server";

import { authConfig } from "@/lib/auth/config";
import { getServerSession } from "next-auth";

export const getCostumers = async () => {
    const session = await getServerSession(authConfig);
    // console.log("Session:", session);

    const school_id = session
    console.log(session, 'asdasdsd')
    if (!school_id) throw new Error("No school found in session.");

    const url = `${process.env.BASE_URL}/teachers/get-teachers/${school_id}`
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${session?.accessToken}` if needed
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Fetch failed:", res.status, errorText);
            throw new Error(`Failed to fetch teacher: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Teachers:", data);
        return data.teacher; // ✅ Return the array only
    } catch (error) {
        console.error("getTeachers error:", error.message);
        throw new Error("Could not load teacher.");
    }
};
