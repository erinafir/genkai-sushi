import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cuisineApi from "../helper/pubApi";
import formatRupiah from "../helper/formatRp";
import Swal from 'sweetalert2'


const DetailPage = () => {
    let { id } = useParams();
    const [detail, setDetail] = useState({})

    const readMenuById = async () => {
        try {
            let { data } = await cuisineApi({
                url: `/pub/cuisines/${id}`,
                method: "GET"
            })
            console.log(data, 'masuk');
            setDetail(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
              });
        }
    }

    useEffect(() => {
        readMenuById()
    }, [])

    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src={detail.imgUrl}
                                alt="..."
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">{detail.Category?.name}</div>
                            <h1 className="display-5 fw-bolder">{detail.name}</h1>
                            <div className="fs-5 mb-3">
                                <span>{formatRupiah(detail.price)}</span>
                            </div>
                            <p className="lead">
                                {detail.description}
                            </p>
                            <Link to={"/pub/cuisines"}
                                className="btn btn-sm btn-outline-secondary"
                            >Back To Menu</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DetailPage