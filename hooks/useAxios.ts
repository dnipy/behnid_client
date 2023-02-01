import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ApiRequest, AuthorizedApiRequest } from '../clients/axios';


const useAxios = (route : string,token?:string) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const router = useRouter()

    const fetchData = () => {
        ApiRequest
            .get(route)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
                router.replace('/500')             
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return { response, error, loading , setError };
};

export const useAuthorizedAxios = (route : string) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        AuthorizedApiRequest
            .get(route)
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

export default useAxios;
