'use server'

const SCHOOL_USER_ID = 1; // Placeholder: This should dynamically come from session or context

async function getClasses() {
    const res = await fetch(`${process.env.BACKEND_URL || ""}/classes/${SCHOOL_USER_ID}/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return { data: null, error: "Failed to fetch classes" };
    }

    const data = await res.json();
    return { data, error: null };
}

export { getClasses };