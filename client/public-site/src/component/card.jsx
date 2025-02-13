import { Link } from "react-router-dom"
import formatRupiah from "../helper/formatRp"

const Card = ({ el, idx }) => {
    return (
        <div className="col">
        <div className="card shadow-sm">
        <img src={el.imgUrl} className="card-img-fluid" alt="..." style={{ height: "250px", objectFit:"cover"}}/>
          
          <div className="card-body">
            <h3 className="card-title text-truncate">
              {el.name}
            </h3>
            <p className="card-subtitle my-2" style={{fontSize: "20px"}}>
              {el.Category.name}
            </p>
            <h5 className="card-subtitle my-2">
              {formatRupiah(el.price)}
            </h5>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link to={`/pub/cuisines/${el.id}`} 
                  className="btn btn-sm btn-outline-secondary"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Card