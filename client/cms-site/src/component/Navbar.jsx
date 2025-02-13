import { Link } from "react-router-dom"


const Navbar = ({ clickLogo }) => {
  return (
    <>
      <header data-bs-theme="dark">
        <div className="text-bg-dark collapse show" id="navbarHeader" style={{}}>
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4>Genkai</h4>
                <p className="text-body-secondary">
                  genkai – 限界 (げんかい) : a noun meaning ‘limit’ in Japanese. Where you can eat to your heart fill, or as our name say, to your limit!
                </p>
              </div>
              
              <div className="col-sm-4 offset-md-1 py-4">
                <h4>Directories</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link to={'/cuisines'} className="text-white">
                      Menus
                    </Link>
                  </li>
                  <li>
                    <Link to={'/categories'} className="text-white">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to={'/add-user'} className="text-white">
                      Add New User
                    </Link>
                  </li>
                  <li>
                    <Link to={'/login'} onClick={() => localStorage.clear()} className="text-white">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link to={'/cuisines'} className="navbar-brand d-flex align-items-center">
              <img className="mx-2" src="https://cdn.discordapp.com/attachments/1235768019309822022/1258081627582500944/logo_genkai.png?ex=6686bf52&is=66856dd2&hm=b8482d6dfa8edce809d0d650be017e01200e0596093c1b077be5c1105b252324&" alt="" style={{ height: 30 }} />
              <strong><i>Genkai Sushi</i></strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar