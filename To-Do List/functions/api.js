/**
 * Fetch a resource from a specific url
 * @param {string} url
 * @param {object} options
 * @returns {Promise}
 */
export async function fetchJSON(url, options = {}) {
    const headers = {Accept: 'application/json', ...options.headers}
    const response = await fetch(url, {...options, headers})

    if (response.ok) {
        return response.json()
    }
    // Throw an error if the server cannot be reached
    throw new Error('Server error', {cause: response})
}