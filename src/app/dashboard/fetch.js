// utils/fetchDashboardCards.js
export async function fetchDashboardCards() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-dashboard-cards`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard cards');
    }

    return res.json();
}
