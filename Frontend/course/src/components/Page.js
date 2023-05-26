import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function Page(){
    const [pageData, setPageData] = useState([]);
    let { page_id, page_slug } = useParams();


    useEffect(()=>{
      try{
          axios.get(baseURL+'/pages/'+page_id+'/'+page_slug)
          .then((res)=>{
            setPageData(res.data);
          })
        }catch(error){
          console.log(error)
        }
      
    }, [page_id]);
    return (
        <div className="container mt-4">
        <h2>{pageData.title}</h2>
        <p>{pageData.content}</p>
        </div>
    )
}

export default Page;