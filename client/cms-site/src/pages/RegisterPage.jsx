import { useState } from "react"
import { useNavigate } from "react-router-dom"
import serverApi from "../helper/serverApi"
import SubmitButton from "../component/SubmitButton"
import Swal from "sweetalert2"

export default function RegisterPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault()
    try {

      let { data } = await serverApi({
        url: "/add-user",
        method: "POST",
        data: { username: username, email: email, password: password, phoneNumber: phoneNumber, address: address },
        headers: { "Authorization": `Bearer ${localStorage.getItem('tokens')}` }
      })

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
    <section className="container" id="register-section">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-3 mt-5">Hi Admin</h1>
          <span>
            Sign up your staff
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
                <form id="register-form" onSubmit={handleRegister}>
                  <h1 className="h3 mb-3 display-1">Register a new account</h1>
                  <span>
                    Sign up to autocomplete your purchase order with
                    your personal data.
                  </span>
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-email">Username</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="register-username"
                      placeholder="Enter username address ..."
                      autoComplete="off"
                      name="username"
                      onChange={(e) => { setUsername(e.target.value) }}
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="register-email"
                      placeholder="Enter email address ..."
                      autoComplete="off"
                      required=""
                      name="email"
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="register-password"
                      placeholder="Enter your password ..."
                      autoComplete="off"
                      required=""
                      name="password"
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-phoneNumber">Phone Number</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="register-phoneNumber"
                      placeholder="Enter your phone number ..."
                      autoComplete="off"
                      name="phoneNumber"
                      onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="register-address">Address</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="register-address"
                      placeholder="Enter your address..."
                      autoComplete="off"
                      name="address"
                      onChange={(e) => { setAddress(e.target.value) }}
                    />
                  </div>
                  <SubmitButton title={"Add User"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}