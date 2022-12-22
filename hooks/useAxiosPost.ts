import { useEffect, useState } from "react";
import { ApiRequest, AuthorizedApiRequest } from "../clients/axios";

export const useAxiosPost = (route : string,data:object) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        
        ApiRequest
            .post(route,JSON.stringify(data))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return { response, error, loading };
};


export const useAuthorizedAxiosPost = (route : string,data:object) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        AuthorizedApiRequest
        .post(route,JSON.stringify(data))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return { response, error, loading };
};

