import { Link } from "react-router-dom"

export default function FormAddUpdate({ functionSubmit, food, setFood, category, setCategory, allCat, desc, setDesc, price, setPrice, imgUrl, setImgUrl }) {
    return (
    <form id="product-form" onSubmit={functionSubmit}>
        <div className="mb-3">
            <label htmlFor="product-name">Name <span className="text-danger fw-bold">*</span></label>
            <input type="text" onChange={(e) => { setFood(e.target.value) }} className="form-control" id="product-name" placeholder="Enter product name" autoComplete="off" name="food" value={food?food:''} required />
        </div>
        <div className="mb-3">
            <label htmlFor="product-category">Category <span className="text-danger fw-bold">*</span></label>
            <select onChange={(e) => { setCategory(e.target.value) }} id="product-category" className="form-select" name="category" value={category?category:''} required>
                <option value={0}>-- Select Category --</option>
                {allCat.map(el =>
                    <option key={el.id} value={el.id}>{el.name}</option>
                )}
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="product-desc">Description <span className="text-danger fw-bold">*</span></label>
            <input onChange={(e) => { setDesc(e.target.value) }} type="text" className="form-control" id="product-desc" placeholder="Enter product description" autoComplete="off" name="description" value={desc?desc:''} required />
        </div>
        <div className="mb-3">
            <label htmlFor="product-price">Price <span className="text-danger fw-bold">*</span></label>
            <input onChange={(e) => { setPrice(e.target.value) }} type="number" min="0" className="form-control" id="product-price" placeholder="Enter product price" autoComplete="off" name="price" value={price?price:''} required />
        </div>
        <div className="mb-3">
            <label htmlFor="product-image">Image</label>
            <input onChange={(e) => { setImgUrl(e.target.value) }} type="text" className="form-control" id="product-image" placeholder="Enter product image url" name="imgUrl" value={imgUrl?imgUrl:''} autoComplete="off" />
        </div>
        <div className="row mt-5 mb-3">
            <div className="col-6">
                <Link to={'/cuisines'} className="btn btn-lg btn-light rounded-pill w-100 p-2" href="">Cancel</Link>
            </div>
            <div className="col-6">
                <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">Submit</button>
            </div>
        </div>
    </form>
    )
}