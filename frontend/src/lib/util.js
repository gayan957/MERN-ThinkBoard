export function formatDate(date) {
    const parsedDate = new Date(date); // ensure it's a Date object
    return parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
