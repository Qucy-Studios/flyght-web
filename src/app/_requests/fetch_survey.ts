export function fetchSurvey(token: string): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/survey`, {
        method: 'GET',
        headers: {
            Authorization: token
        }
    })
}