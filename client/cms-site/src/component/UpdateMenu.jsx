import { useEffect, useState } from "react"
import serverApi from "../helper/serverApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import FormAddUpdate from "./formAddUpdate";

export default function UpdateMenu() {
    const navigate = useNavigate()
    let { id } = useParams();
    const [detail, setDetail] = useState({})
    const [food, setFood] = useState('')
    const [allCat, setAllCat] = useState([])
    const [category, setCategory] = useState(0)
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState('')

    const readMenuById = async () => {
        try {
            let { data } = await serverApi({
                url: `/cuisines/${id}`,
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` }
            })
            setDetail(data)
            setFood(data.name)
            setCategory(data.categoryId)
            setDesc(data.description)
            setPrice(data.price)
            setImgUrl(data.imgUrl)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    const readCat = async () => {
        try {
            let { data } = await serverApi({
                url: `/categories`,
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` }
            })
            setAllCat(data.allCategories)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }
    const handleUpdateMenu = async (e) => {
        e.preventDefault()
        try {
            if (category === 0) {
                throw { message: 'Select a category!' }
            }
            let { data } = await serverApi({
                url: `/cuisines/${id}`,
                method: "PUT",
                data: { name: food, categoryId: category, description: desc, price: price, imgUrl: imgUrl },
                headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` }
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

    useEffect(() => {
        readCat()
    }, [])

    useEffect(() => {
        readMenuById()
    }, [])

    return (
        <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="display-3">Update Menu</h1>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FormAddUpdate functionSubmit={handleUpdateMenu} setFood={setFood} setCategory={setCategory} allCat={allCat} setDesc={setDesc} setPrice={setPrice} setImgUrl={setImgUrl} food={food} category={category} desc={desc} price={price} imgUrl={imgUrl} />
                </div>
            </div>
        </section>
    )
}