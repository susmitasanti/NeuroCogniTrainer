import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    // <section>
    //     <h1>Unauthorized</h1>
    //     <br />
    //     <p>You do not have access to the requested page.</p>
    //     <div className="flexGrow">
    //         <button onClick={goBack}>Go Back</button>
    //     </div>
    // </section>
    <section className="text-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="mt-4">You do not have access to the requested page.</p>
      <div className="flex-grow mt-8">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
