import { useEffect, useState } from "react";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import apiClient from "../../services/api-client";
import FlowerList from "./FlowerList";

const Flowers = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        apiClient
        .get("/flowers/")
        .then((res) => setProducts(res.data.results))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },[]);
    
    return (
        <div className="sm:m-5 md:m-10 m-2">
            <FlowerList products={products} isLoading={isLoading} />
            
        </div>
    );
};

export default Flowers;