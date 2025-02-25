export class HTTPService {
    get<T>(url: string){
        return fetch(url)
        .then(response => response.json() as T);
    }
    delete<T>(url){
        return fetch(url, {
            method: 'DELETE'
        }).then(response => response.json() as T);
    }
    post<T>(url: string, body, options = { headers: {"Content-type": "application/json; charset=UTF-8"}}){
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: options.headers,
        }).then(response => response.json() as T);
    }
    put<T>(url, body, options = { headers: {"Content-type": "application/json; charset=UTF-8"}}){
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: options.headers,
        }).then(response => response.json() as T);

    }
    /* request(url, method, options = {}){
        return fetch(url, {
            method,
            ...options,
        });
    } */
}