import React from "react";
import error from "../images/404error.png";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function Page404() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center mt-5">
                        <img src={error} alt="404 Error" className="img-fluid mb-4" />
                        <Button color="primary" outline onClick={()=>navigate("/")}>
              Go to Home
            </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
