export const searchParamsToObject = (searchParams: URLSearchParams) => {
    const obj: any = {}
    for (const [key, value] of searchParams) {
        if (!obj[key] || obj[key] != "") {
            obj[key] = value
        };
    }
    return obj
}
