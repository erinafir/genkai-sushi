import { useEffect, useState } from "react";
import formatRupiah from "../helper/formatRp";
import serverApi from "../helper/serverApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function MenuPage() {
    const [allMenu, setAllMenu] = useState([])
    
    const readMenu = async () => {
        try {
            let { data } = await serverApi({
                url: "/cuisines",
                method: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem('tokens')}`}
            })
            setAllMenu(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
        }
    }

    const handleDelete = async (id) => {
        try {
            let { data } = await serverApi({
                url: `/cuisines/${id}`,
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem('tokens')}`}
            })
            readMenu()
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
        }
    }

    useEffect(() => {
        readMenu()
    }, [])

    return (
        <>
            <section
                className="ms-sm-auto px-md-5"
                id="product-section"
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Menus</h1>
                    <Link to={'/cuisines/add'} className="btn btn-primary rounded-pill" data-bs-target="#new-product">
                        <span className="icon material-symbols-outlined">add</span>New Menu
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" width="180px">
                                        Image
                                    </th>
                                    <th scope="col" width="250px">
                                        Description
                                    </th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-menu">
                                {allMenu.map((el, idx) => {
                                    return (<tr key={el.id}>
                                        <td scope="row">{idx+1}</td>
                                        <td className="fw-bold">{el.name}</td>
                                        <td>
                                            <img
                                                src={el.imgUrl} className="img-thumbnail"
                                            />
                                        </td>
                                        <td>{el.description}</td>
                                        <td className="fw-bold">{formatRupiah(el.price)}</td>
                                        <td>{el.Category?.name}</td>
                                        <td>{el.User?.username}</td>
                                        <td>
                                            <span className="d-flex">
                                                <a type="button" onClick={()=>{handleDelete(el.id)}} className="ms-3">
                                                    <span className="icon material-symbols-outlined text-danger">
                                                        delete
                                                    </span>
                                                </a>
                                                <Link to={`/cuisines/${el.id}/update`} className="ms-3">
                                                    <span className="icon material-symbols-outlined text-danger">
                                                        edit
                                                    </span>
                                                </Link>
                                                <Link to={`/cuisines/${el.id}/updateImg`} className="ms-3">
                                                    <span className="icon material-symbols-outlined text-danger">
                                                        image
                                                    </span>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}