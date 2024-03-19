import { Link } from "react-router-dom";

const Admin = () => {
  return (
    // <section>
    //     <h1>Admins Page</h1>
    //     <br />
    //     <p>You must have been assigned an Admin role.</p>
    //     <div className="flexGrow">
    //         <Link to="/">Home</Link>
    //     </div>
    // </section>

    <section className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin's Page</h1>
      <p className="mb-2">You must have been assigned an Admin role.</p>
      <div className="flex-grow mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </div>
    </section>
  );
};

export default Admin;
