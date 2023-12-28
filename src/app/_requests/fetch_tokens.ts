export function fetchExchangeToken(accessToken: string): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/token/exchange`, {
        method: 'POST',
        headers: {
            Authorization: accessToken,
        }
    })
}