import { useState } from "react"
import serverApi from "../helper/serverApi";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../component/SubmitButton";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      let {data} = await serverApi({
        url: "/login",
        method: "POST",
        data: {email: email, password: password}
      })
      localStorage.setItem("tokens", data.access_token)
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
        <section className="container" id="login-section">
  <div className="row">
    <div className="col-12 text-center">
      <h1 className="mb-3 mt-5">Login Options</h1>
      <span>
        Log in and autocomplete your order with your personal data, or sign up
        to enjoy all the benefits of a Genkai account.
      </span>
    </div>
    <div className="col-12 col-lg-8 offset-lg-2 my-5">
      <div className="row">
        <div className="col-12 col-md-6 border-end p-2 text-left">
          <img
            src="https://cdn.discordapp.com/attachments/1235768019309822022/1258083334366691358/genkai_kotak.png?ex=6686c0e8&is=66856f68&hm=a159f41f014c45ab52d27a1c098ddb79a5d6ad61e293805d43a56baf3fbfc633&"
            width="350px"
            alt="sushi"
          />
        </div>
        <div className="col-12 col-md-6 p-5 text-left">
          <div className="form-signin m-auto">
            <form id="login-form" onSubmit={handleLogin}>
              <h1 className="h3 mb-3 display-1">Log in to your account</h1>
              <span>
                Log in on your profile to autocomplete your purchase order with
                your personal data.
              </span>
              <div className="mb-3 mt-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="login-email">Email</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="login-email"
                  placeholder="Enter email address ..."
                  autoComplete="off"
                  required=""
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label htmlFor="login-password">Password</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Enter your password ..."
                  autoComplete="off"
                  required=""
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
              <SubmitButton title={'Log In'}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    )
}