
export async function GET(req, { params }) {
    const { id } = params;


    const res = await fetch(`${process.env.BACKEND_URL}/student/${id}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), { status: res.status });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();


    const res = await fetch(`${process.env.BACKEND_URL}/student/${id}`/ {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: res.status });
}

export async function DELETE(req, { params }) {
    const { id } = params;


    const res = await fetch(`${process.env.BACKEND_URL}/student/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = await res.json();
        return new Response(JSON.stringify({ error: errorData.message || "Failed to delete student" }), { status: res.status });
    }

    return new Response(null, { status: 204 });
}
