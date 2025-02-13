import { useEffect, useState } from "react"
import serverApi from "../helper/serverApi"
import Swal from "sweetalert2"

export default function CategoryPage() {
    const [allCategories, setCategories] = useState([])
    let readCategories = async () => {
        try {
            let { data } = await serverApi({
                url: "/categories",
                method: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem('tokens')}`}
            })
            setCategories(data.allCategories)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
        }
    }
    
    useEffect(() => {
        readCategories()
    }, [])

    return (
        <>
            <section
                className="ms-sm-auto px-md-5"
                id="product-section"
            >
                <div className="container row">
                <h1 className="display-2 my-3">Categories</h1>
                    <div className="col-12 table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                </tr>
                            </thead>
                            <tbody id="table-category">
                                {allCategories.map((el, idx)=>
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>{el.name}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}