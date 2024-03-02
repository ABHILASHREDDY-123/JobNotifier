import { Bars } from "react-loader-spinner"
import "../styles/loader.css";

const Loader = () => {
    return <div className="loader">
        <Bars
            height="80"
            width="80"
            color="#0A71EB"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
}

export default Loader;