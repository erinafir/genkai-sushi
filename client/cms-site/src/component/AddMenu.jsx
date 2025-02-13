import { useEffect, useState } from "react"
import serverApi from "../helper/serverApi"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import FormAddUpdate from "./formAddUpdate"

export default function AddMenu() {
    const navigate = useNavigate()
    const [food, setFood] = useState('')
    const [allCat, setAllCat] = useState([])
    const [category, setCategory] = useState(0)
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const readCat = async () => {
        try {
            let { data } = await serverApi({
                url: `/categories`,
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` }
            })
            setAllCat(data.allCategories)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddMenu = async (e) => {
        e.preventDefault()
        try {
            if (category === 0) {
                throw {message: 'Select a category!'}
            }
            let { data } = await serverApi({
                url: `/cuisines`,
                method: "POST",
                data: { name: food, categoryId:category, description: description, price: price, imgUrl: imgUrl },
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
    
    return (
        <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="display-3">New Menu</h1>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FormAddUpdate functionSubmit={handleAddMenu} setFood={setFood} setCategory={setCategory} allCat={allCat} setDesc={setDesc} setPrice={setPrice} setImgUrl={setImgUrl}/>
                </div>
            </div>
        </section>
    )
}