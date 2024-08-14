const OtpVerification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-6">Enter the OTP sent to your email</p>
        <form>
          <div className="flex justify-between mb-6">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                maxLength="1"
              />
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 rounded-md hover:from-green-600 hover:to-blue-700 transition duration-300" type="submit">
            Verify
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Didn`&apos`t receive the code? <a href="#" className="text-blue-600 hover:underline">Resend</a>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;