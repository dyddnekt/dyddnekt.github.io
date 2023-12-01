import { useFetch, usePost } from "hooks/useFetch";

function Fetch({ uri, renderSuccess = f => f,
    loadingFallBack = <p>Loading...</p>,
    renderError = ({ err }) => (<pre>{JSON.stringify(err, null, 2)}</pre>) }) {

    const { loading, data, error } = useFetch(uri);

    if (loading) return loadingFallBack;
    if (error) return renderError({ error });
    if (data) {
        return renderSuccess(data);
    };
}

function AxiosPost({ uri, body, renderSuccess = f => f,
    loadingFallBack = <p>Loading...</p>,
    renderError = ({ err }) => (<pre>{JSON.stringify(err, null, 2)}</pre>) }) {

    const { loading, data, error } = usePost(uri, body);

    if (loading) return loadingFallBack;
    if (error) return renderError({ error });
    if (data) {
        return renderSuccess(body, data);
    }
}

export { Fetch, AxiosPost };