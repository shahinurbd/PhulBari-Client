import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import ErrorAlert from "../ErrorAlert";
import SuccessAlert from "../SuccessAlert";
import useAuthContext from "../../hooks/useAuthContext";

const SignUpForm = () => {
    const [showTerms, setShowTerms] = useState(null);
    const [showPrivacy, setShowPrivacy] = useState(null);
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const [successMsg, setSuccessMsg] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {resendActivation, registerUser} = useAuthContext();


    const onSubmit = async (data) => {
      if (!data) {
      setErrorMsg("Form data is missing.");
      return;
      }
        if ("confirm_password" in data) delete data.confirm_password;
        setLoading(true);
        setErrorMsg(""); 
        setSuccessMsg("");
        try{
            const response = await registerUser(data);
            console.log(response);
             
              if(response?.success){
                setSuccessMsg(response.message);
                setEmail(data.email);   
            } else {
            setErrorMsg(response?.message || "This Email has already an account. Try with new!");
          }
        } catch(error){
            console.error("API error:", error);
            const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.";
          setErrorMsg(message);
        } finally{
          setLoading(false);
        }
    };

    const handleResend = async(email) => {
      setLoading(true);
        try{
            const response = await resendActivation({email});
            if(response.success){
                setSuccessMsg(response.message);
            }
        } catch(error){
            console.log(error);
        } finally{
          setTimeout(() => (
            setLoading(false)
          ), 15000);
        }
    };

    return (
        <div className="py-16 px-4 bg-white mt-10">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-2xl md:text-3xl font-bold">Register</h1>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">Your Account</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-sm"></div>
        </div>

        <div className="mb-2">{errorMsg && <ErrorAlert
                    error={errorMsg} />}</div>

        <div className="mb-2">{successMsg && <SuccessAlert success={successMsg} />}</div>

        {email && <div className="my-5">
                        <span className='text-sm'>Didn't Get Email? <button className='text-sm text-blue-600' type='button' disabled={loading} onClick={() => handleResend(email)}>Resend Activation</button></span>
                    </div>}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("first_name", {required: "First Name is required."})}
          />
          {errors.first_name && (
              <span className="label-text-alt text-error py-1">{errors.first_name.message}</span>
            )}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("last_name", {required: "Last Name is required."})}
          />
          {errors.last_name && (
                    <span className="label-text-alt text-error py-1">{errors.last_name.message}</span>
                    )}
          <input
            type="email"
            placeholder="Email*"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("email", {required: "Email is required."})}
          />
          {errors.email && (
                    <span className="label-text-alt text-error py-1">{errors.email.message}</span>
                    )}
          <input
            type="tel"
            placeholder="Phone Number*"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("phone_number", {required: "Phone Number is required."})}
          />
          {errors.phone_number && (
                    <span className="label-text-alt text-error py-1">{errors.phone_number.message}</span>)}
          
          <input
            type="password"
            placeholder="Password*"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("password", {required: "Password is required.", minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }})}
          />
          {errors.password && (
                    <span className="label-text-alt text-error py-1">{errors.password.message}</span>
                    )}
          <input
            type="password"
            placeholder="Confirm Password*"
            className="w-full bg-gray-100 px-4 py-3 border border-gray-200 focus:outline-none focus:border-pink-500"
            {...register("confirm_password", {required: "Confirm Password is required.", validate: (value) => value === watch("password") || "Password do not match"})}
          />
          {errors.confirm_password && (
                    <span className="label-text-alt text-error py-1">{errors.confirm_password.message}</span>
                    )}

          {/* Checkboxes */}
          <div className="space-y-2 text-sm text-gray-600">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>
                I consent to Herboil processing my personal data in order to
                send personalized marketing material in accordance with the
                consent form and the privacy policy.
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>
                By clicking "create account", I consent to the privacy policy.
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-800 text-white font-semibold px-6 py-3 w-full md:w-auto"
          >
           {loading ? "Signing Up...." : " CREATE ACCOUNT"}
          </button>

          {/* Terms */}
          <p className="text-center mt-6 text-sm text-gray-600">
            By creating an account, you agree to our:
          </p>
          <p className="text-center text-sm font-medium text-gray-800">
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="hover:text-pink-500"
            >
              TERMS OF CONDITIONS
            </button>
            <span className="mx-2">|</span>
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="hover:text-pink-500"
            >
              PRIVACY POLICY
            </button>
          </p>

          {/* Already have account */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <Link to='/login'>
            ALREADY HAVE AN ACCOUNT ?
            </Link>
          </div>
          
        </form>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-100 overflow-y-scroll">
            <p className="text-gray-600 text-sm">
            <h1 class="text-3xl font-bold mb-4">Terms & Conditions</h1>
            <p class="mb-4">By registering on <strong>Phulbari</strong>, you agree to the following terms:</p>
            
            <h2 class="text-xl font-semibold mt-4 mb-2">1. Eligibility</h2>
            <p>You must be at least 18 years old to register (or use under parent/guardian supervision).</p>
            
            <h2 class="text-xl font-semibold mt-4 mb-2">2. Account Information</h2>
            <p>Provide accurate details and keep your login credentials secure. You are responsible for all activity on your account.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">3. Orders & Payments</h2>
            <p>All orders made from your account are valid and must be paid for. Prices may change without notice.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">4. Communication</h2>
            <p>By registering, you agree to receive emails/SMS about orders, promotions, and updates. You can opt-out of promotional messages anytime.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">5. Privacy</h2>
            <p>Your personal data is handled according to our <a href="/privacy" class="text-pink-500 hover:underline">Privacy Policy</a> and will not be shared without consent.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">6. Termination</h2>
            <p>We may suspend or close your account for misuse, fraud, or false information.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">7. Changes</h2>
            <p>We may update these terms at any time. Continued use of your account means you accept the new terms.</p>

            <h2 class="text-xl font-semibold mt-4 mb-2">8. Governing Law</h2>
            <p>These terms are governed by the laws of Bangladesh.</p>
            </p>
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              onClick={() => setShowTerms(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-100 overflow-y-scroll">
            <p className="text-gray-600 text-sm">
              <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
              <p class="mb-4">Phulbari (“we,” “our,” or “us”) respects your privacy. By using our website, you agree to the practices described below.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">1. Information We Collect</h2>
              <ul class="list-disc ml-6">
                <li>Personal Information: Name, email, phone number, delivery address, payment info.</li>
                <li>Account Information: Login credentials and account activity.</li>
                <li>Usage Data: Pages visited, products viewed, and interactions on the website.</li>
              </ul>

              <h2 class="text-xl font-semibold mt-4 mb-2">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul class="list-disc ml-6">
                <li>Process orders and payments.</li>
                <li>Deliver products and services.</li>
                <li>Send updates, promotions, and notifications.</li>
                <li>Improve website functionality and user experience.</li>
                <li>Comply with legal obligations.</li>
              </ul>

              <h2 class="text-xl font-semibold mt-4 mb-2">3. Sharing Your Information</h2>
              <p>We do not sell your information. We may share it with:</p>
              <ul class="list-disc ml-6">
                <li>Service providers necessary to provide our services (e.g., payment gateways, delivery partners).</li>
                <li>Legal authorities if required by law or to protect our rights.</li>
              </ul>

              <h2 class="text-xl font-semibold mt-4 mb-2">4. Cookies and Tracking</h2>
              <p>We may use cookies to improve your browsing experience, remember preferences, and analyze website usage.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">5. Data Security</h2>
              <p>We implement measures to protect your data against unauthorized access or misuse.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">6. Your Rights</h2>
              <p>You can access, update, delete your information, or opt-out of marketing communications. Contact us at <a href="mailto:[Insert Email]" class="text-pink-500 hover:underline">support@phulbari.com</a> to exercise your rights.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">7. Data Retention</h2>
              <p>We retain your data as long as necessary to provide services and comply with legal obligations.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">8. Changes to Privacy Policy</h2>
              <p>We may update this policy at any time. Continued use means you accept the updated policy.</p>

              <h2 class="text-xl font-semibold mt-4 mb-2">9. Contact Us</h2>
              <p>Email: <a href="mailto:[Insert Email]" class="text-pink-500 hover:underline">support@phulbari.com</a><br/>
              Phone: +88 01XXXXXXXX<br/>
              Address: 7A, Dhanmondi, Dhaka</p>
            </p>
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              onClick={() => setShowPrivacy(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    );
};

export default SignUpForm;