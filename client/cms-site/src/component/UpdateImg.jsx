import { useState } from "react"
import serverApi from "../helper/serverApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export default function UpdateImg() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const handleChange = () => {
        const image = event.target.files[0]
        setFile(image)
    }
    const handlePatchImg = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData()
            formData.append('imgUrl', file)
            let { data } = await serverApi({
                url: `/cuisines/${id}/changeImg`,
                method: "PATCH",
                headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` },
                "Content-Type": "multipart/form-data",
                data: formData
            })
            console.log(data);
            navigate('/cuisines')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }
    return (
        <section
            className="container col-md-9 ms-sm-auto col-lg-10 px-md-4"
            id="update-product-section"
        >
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="pt-3 pb-2 mb-3">
                        <form id="register-form" onSubmit={handlePatchImg}>
                            <h1 className="h3 mb-4 display-3">Update Image</h1>
                            <div className="mb-3">
                                <div className="input-group mb-3">
                                    <input
                                        type="file"
                                        className="form-control pb-2"
                                        id="inputGroupFile02"
                                        autoComplete="off"
                                        required=""
                                        name="imgUrl"
                                        onChange={handleChange}
                                    />
                                </div>


                                <button
                                    className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                                    type="submit"
                                >
                                    Update Image
                                </button>
                                <Link to={'/cuisines'} className="btn btn-lg btn-light rounded-pill w-100 p-2 mt-3" href=""><small>Cancel</small></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}