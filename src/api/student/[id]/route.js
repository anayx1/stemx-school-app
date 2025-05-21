// app/api/student/[id]/route.js

export async function GET(req, { params }) {
    const { id } = params;

    const res = await fetch(`${process.env.BACKEND_URL}/student/${id}`);
    const data = await res.json();

    return Response.json(data);
}

export async function POST(req, { params }) {
    const { id } = params;
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/student/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await res.json();
    return Response.json(result);
}
