import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    // <section>
    //     <h1>Links</h1>
    //     <br />
    //     <h2>Public</h2>
    //     <Link to="/login">Login</Link>
    //     <Link to="/register">Register</Link>
    //     <br />
    //     <h2>Private</h2>
    //     <Link to="/doctor">Home</Link>
    //     <Link to="/patient">My Tasks</Link>
    //     <Link to="/admin">Admin Page</Link>
    // </section>

    <section className="py-8">
      <h1 className="text-3xl font-bold mb-4">Links</h1>
      <h2 className="text-xl font-semibold mb-2">Public</h2>
      <div className="mb-4">
        <Link to="/login" className="text-blue-500 hover:underline mr-4">
          Login
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-2">Private</h2>
      <div>
        <Link to="/doctor" className="text-blue-500 hover:underline mr-4">
          Home
        </Link>
        <Link to="/patient" className="text-blue-500 hover:underline mr-4">
          My Tasks
        </Link>
        <Link to="/admin" className="text-blue-500 hover:underline">
          Admin Page
        </Link>
      </div>
    </section>
  );
};

export default LinkPage;
