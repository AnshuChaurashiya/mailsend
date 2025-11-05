import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import EmailPreview from "../components/EmailPreview.jsx";
import { API_URL } from "./Api.js";
import { useAuth } from "../contex/auth.jsx";

const EmailForm = () => {
  const { token } = useAuth();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState([""]);
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addEmail = () => setEmails([...emails, ""]);

  const removeEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const csvEmails = results.data.flat().filter(Boolean);
          setEmails(csvEmails);
        },
      });
    }
  };

  const getAllEmails = () => {
    const emailList = [...emails.filter(e => e.trim())];
    if (emailText) {
      emailList.push(...emailText.split(",").map((e) => e.trim()).filter(e => e));
    }
    return [...new Set(emailList)]; // Remove duplicates
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const emailList = getAllEmails();
    if (emailList.length === 0) {
      setMessage("Please add at least one email.");
      setLoading(false);
      return;
    }

    try {
      if (!token) {
        setMessage("Authentication failed. Please log in again.");
        return;
      }

      const response = await axios.post(`https://mailsend-spjk.onrender.com/api/gmail/sendEmails`, {
        subject,
        message: body,
        recipients: emailList,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message || "Emails sent successfully");
      // Reset form
      setSubject("");
      setBody("");
      setEmails([""]);
      setEmailText("");
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Authentication failed. Please log in again.");
      } else {
        setMessage(error.response?.data?.message || "Failed to send emails.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4 bg-gray-100 rounded-2xl mb-10 w-[96%] m-auto md:w-full">
      <form onSubmit={handleSubmit} className="w-full rounded-2xl">
        <h2 className="text-xl sm:text-2xl mb-2 font-bold text-black text-center">
          Send Bulk Emails
        </h2>

        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email Subject"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Email Body"
            rows={5}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 resize-none"
          />
        </div>

        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Emails (Comma Separated)"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 resize-none"
        />

        <div>
          <label className="block mb-2 font-medium text-gray-700 ">
            Upload CSV
          </label>
          <input
            type="file"
            accept=".csv, .pdf"
            onChange={handleCSVUpload}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
        </div>

        <div className="mt-2">
          {emails.map((email, idx) => (
            <div key={idx} className="flex gap-2 items-center mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(idx, e.target.value)}
                placeholder="Enter email"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => removeEmail(idx)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <MdDeleteForever />
              </button>
            </div>
          ))}
        </div>

        <EmailPreview emails={getAllEmails()} />

        <div className="flex justify-center p-2 gap-5">
          <button
            type="button"
            onClick={addEmail}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            Add Email
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Emails"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
