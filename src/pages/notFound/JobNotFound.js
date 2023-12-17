

const JobNotFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Job Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! It looks like the job you are looking for doesn't exist.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:underline"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default JobNotFound;
