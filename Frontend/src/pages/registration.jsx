import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      userName: "",
      fullName: "",
      password: "",
      avatar: null,
      coverImage: null,
      avatarPreview: null,
      coverImagePreview: null,
    });

    const [loading, setLoading] = useState(false);

    const avatarRef = useRef();
    const coverRef = useRef();

    // Handle text inputs
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file inputs
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
        [`${name}Preview`]: URL.createObjectURL(files[0]),
        });
    }
  };

    //Handle form submission
    const handleSubmit = (e) =>{
       e.preventDefault();
       setLoading(true);

        if (!formData.userName || !formData.email || !formData.fullName || !formData.password || !formData.avatar) {
         alert("All fields are required, including avatar");
         setLoading(false);
         return;
        }

       const formDataToSend = new FormData();
       formDataToSend.append("fullName", formData.fullName);
       formDataToSend.append("userName", formData.userName.toLocaleLowerCase());
       formDataToSend.append("email", formData.email);
       formDataToSend.append("password", formData.password);
       formDataToSend.append("avatar", formData.avatar);

       if (formData.coverImage) formDataToSend.append("coverImage", formData.coverImage);

       axios.post("/api/v1/auth/register", formDataToSend, {
       headers: { "Content-Type": "multipart/form-data" },

       }).then((res) => {
           console.log("User registered:", res.data);
           navigate("/", { replace: true });

       }).catch((err) => {
           console.error("Registration failed:", err.response?.data || err.message);
           setLoading(false);

       }).finally(() => {
           setLoading(false);

           if (avatarRef.current) avatarRef.current.value = "";
              formData.avatar && URL.revokeObjectURL(formData.avatarPreview);

           if (coverRef.current) coverRef.current.value = "";
           formData.coverImage && URL.revokeObjectURL(formData.coverImagePreview);



           setFormData({
            email: "",
            userName: "",
            password: "",
            fullName: "",
            avatar: null,
            coverImage: null,
            avatarPreview: null,
            coverImagePreview: null,
           });

           
         });

    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-teal-500 cursor-pointer">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Account
        </h2>

        <form 
        className="space-y-5" 
        onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="block text-gray-800 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-500 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-800 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-gray-800 mb-2">Avatar (Required)</label>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            {formData.avatarPreview && (
              <img
                src={formData.avatarPreview}
                alt="avatar preview"
                className="mt-3 w-20 h-20 rounded-full object-cover border-2 border-teal-400"
              />
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-gray-800 mb-2">Cover Image (Optional)</label>
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              name="coverImage"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-400 border border-gray-300 outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formData.coverImagePreview && (
              <img
                src={formData.coverImagePreview}
                alt="cover preview"
                className="mt-3 w-full h-32 object-cover rounded-lg border-2 border-cyan-400 "
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading} // disable button while loading
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg cursor-pointer transition-transform hover:scale-105
            ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-teal-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
