export function updateSurvey(exchangeToken: string, origin: string | null, body: any): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/survey`, {
        method: 'POST',
        //@ts-ignore
        headers: {
            Authorization: exchangeToken,
            'Content-Type': 'application/json',
            'X-Flyght-Origin': origin ?? undefined
        },
        body: JSON.stringify(body)
    })
}