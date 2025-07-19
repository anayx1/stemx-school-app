'use server'

import { revalidatePath } from 'next/cache'

export async function addStudent(data, school_user_id) {
    const url = `${process.env.BACKEND_URL || ""}/students/create/001`

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to add student. Status:', res.status, 'Response:', errorText);
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(JSON.stringify(errorJson));
        } catch (e) {
            throw new Error(`An error occurred on the server: ${res.status} ${res.statusText}`);
        }
    }

    const responseText = await res.text();
    try {
        const responseJson = JSON.parse(responseText);
        revalidatePath('/students');
        return responseJson;
    } catch (e) {
        revalidatePath('/students');
        return {}; 
    }
}
