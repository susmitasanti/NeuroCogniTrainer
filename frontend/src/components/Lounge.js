import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    // <section>
    //     <h1>The Lounge</h1>
    //     <br />
    //     <p>Admins and Editors can hang out here.</p>
    //     <div className="flexGrow">
    //         <Link to="/">Home</Link>
    //     </div>
    // </section>

    <section className="text-center py-8">
      <h1 className="text-3xl font-bold">The Lounge</h1>
      <p className="mt-2 text-gray-600">
        Admins and Editors can hang out here.
      </p>
      <div className="flex-grow mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </div>
    </section>
  );
};

export default Lounge;
