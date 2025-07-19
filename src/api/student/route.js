

export async function POST(req) {
    const body = await req.json();

    const requiredFields = ["full_name", "email", "roll_number", "guardian_name", "contact_number", "class"];
    for (const field of requiredFields) {
        if (!body[field]) {
            return new Response(JSON.stringify({ error: `${field} is required` }), { status: 400 });
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData = await res.json();
        return new Response(JSON.stringify({ error: errorData.message || "Failed to add student" }), { status: res.status });
    }

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: 201 });
}

export async function GET() {
    const res = await fetch(`${process.env.BACKEND_URL}/student`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
}
