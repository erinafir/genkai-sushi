export default function Header() {
    return (
        <div className="bg-image"
            style={{
                backgroundImage:
                    'url("https://img.freepik.com/free-photo/osaka-japan-september-1-unidentified-chefs-prepare-takoyaki_1258-87.jpg?t=st=1720024306~exp=1720027906~hmac=ed30dfbdf87ee3af9ffddcf7f0dff488b47a3e6e65522bccfa5f95eaa71a17cd&w=740")'
            }}>
            <section className="py-5 container">
                <div className="row py-sm-5" style={{ backgroundColor: "white" }}>
                    <div className="col-sm-6 col-md-8 mx-auto">
                        <div className="d-flex justify-content-center align-items-center">
                            <img className="mx-2" src="https://cdn.discordapp.com/attachments/1235768019309822022/1258081627582500944/logo_genkai.png?ex=6686bf52&is=66856dd2&hm=b8482d6dfa8edce809d0d650be017e01200e0596093c1b077be5c1105b252324&" alt="" style={{ height: 200 }} />
                            <h1 className="h3 display-1">Genkai Sushi</h1>
                        </div>
                        <p className="lead text-body-secondary text-center align-self-end">
                            EAT TO YOUR LIMIT
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}