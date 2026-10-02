const BASE_URL = 'https://api.github.com';

export class GitHubApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'GitHubApiError';
        this.status = status;
    }
}

export async function getUserProfile(username) {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`);

    if (!response.ok) {
        throw new GitHubApiError(
            `A API do GitHub respondeu com o status ${response.status}.`,
            response.status
        );
    }

    return response.json();
}
