import { Link } from "react-router-dom";

const Missing = () => {
  return (
    // <article style={{ padding: "100px" }}>
    //     <h1>Oops!</h1>
    //     <p>Page Not Found</p>
    //     <div className="flexGrow">
    //         <Link to="/">Visit Our Homepage</Link>
    //     </div>
    // </article>
    <article className="p-16">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="text-xl">Page Not Found</p>
      <div className="flex-grow mt-8">
        <Link to="/" className="text-blue-500 hover:underline">
          Visit Our Homepage
        </Link>
      </div>
    </article>
  );
};

export default Missing;
