import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";

const AdminInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [fromEmail, setFromEmail] = useState(
    import.meta.env.VITE_FROM_EMAIL || ""
  );

  // Initialize EmailJS with your public key from env
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const markAsRead = async (id) => {
    try {
      const contactDoc = doc(db, "contacts", id);
      await updateDoc(contactDoc, { read: true });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read: true } : c))
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setResponseText("");
    setEmailStatus("");
    if (!contact.read) markAsRead(contact.id);
  };

  const sendEmailResponse = async () => {
    if (!responseText.trim() || !selectedContact || !fromEmail) {
      setEmailStatus("Please fill in the response and your email.");
      return;
    }
    setSendingEmail(true);
    setEmailStatus("Sending...");

    try {
      const templateParams = {
        to_email: selectedContact.email,
        to_name: selectedContact.name,
        from_email: fromEmail,
        from_name: "Arjun Buildtech",
        message: responseText,
        customer_message: selectedContact.message,
        customer_phone: selectedContact.phone,
        customer_location: selectedContact.location,
        subject: `Re: Your Inquiry - ${selectedContact.name}`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setEmailStatus("✅ Email sent successfully!");
      setResponseText("");

      // Update Firebase
      const contactDoc = doc(db, "contacts", selectedContact.id);
      await updateDoc(contactDoc, {
        status: "replied",
        repliedAt: new Date(),
        lastResponse: responseText,
      });

      setContacts((prev) =>
        prev.map((c) =>
          c.id === selectedContact.id
            ? { ...c, status: "replied", lastResponse: responseText }
            : c
        )
      );
      setSelectedContact((prev) =>
        prev ? { ...prev, status: "replied", lastResponse: responseText } : null
      );
    } catch (error) {
      console.error("Failed to send email:", error);
      setEmailStatus("❌ Failed to send email. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getRandomColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-indigo-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const responseTemplates = [
    {
      name: "Thank You",
      text: "Thank you for your inquiry. We have received your message and will get back to you shortly.",
    },
    {
      name: "More Info Needed",
      text: "Thank you for contacting us. Could you please provide more details about your requirements?",
    },
    {
      name: "Appointment",
      text: "Thank you for your interest. We'd like to schedule a call to discuss your requirements. Please let us know your availability.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex h-[80vh]">
          {/* Left Sidebar */}
          <div className="w-1/3 border-r border-gray-200 bg-gray-50">
            <div className="bg-green-500 p-4 text-white">
              <h1 className="text-xl font-semibold">Customer Inquiries</h1>
              <p className="text-green-100 text-sm">
                {contacts.length} messages •{" "}
                {contacts.filter((c) => !c.read).length} unread
              </p>
            </div>
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(80vh-120px)]">
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No inquiries found
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedContact?.id === contact.id ? "bg-green-50" : ""
                    } ${
                      !contact.read
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor(
                        contact.name
                      )}`}>
                      {getInitials(contact.name)}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {contact.createdAt?.seconds
                            ? new Date(
                                contact.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "Recently"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {contact.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {contact.location}
                        </span>
                        <div className="flex items-center gap-1">
                          {contact.status === "replied" && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Replied
                            </span>
                          )}
                          {!contact.read && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-2/3 flex flex-col">
            {selectedContact ? (
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {/* Customer Original Message */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Customer Message
                  </h4>
                  <p className="text-gray-700">{selectedContact.message}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    {selectedContact.createdAt?.seconds
                      ? new Date(
                          selectedContact.createdAt.seconds * 1000
                        ).toLocaleString()
                      : "Recently"}
                  </span>
                </div>

                {/* Admin Response (if exists) */}
                {selectedContact.lastResponse && (
                  <div className="bg-green-50 rounded-2xl p-4 shadow-sm border border-green-200 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Admin Response
                    </h4>
                    <p className="text-gray-700">
                      {selectedContact.lastResponse}
                    </p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {selectedContact.repliedAt
                        ? new Date(
                            selectedContact.repliedAt.toDate
                              ? selectedContact.repliedAt.toDate()
                              : selectedContact.repliedAt
                          ).toLocaleString()
                        : "Recently"}
                    </span>
                  </div>
                )}

                {/* From Email Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Response Textarea */}
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                  rows="4"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    This will be sent to: {selectedContact.email}
                  </span>
                  <button
                    onClick={sendEmailResponse}
                    disabled={
                      sendingEmail || !responseText.trim() || !fromEmail
                    }
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    {sendingEmail ? "Sending..." : "Send Email"}
                  </button>
                </div>
                {emailStatus && (
                  <div
                    className={`mt-2 text-sm ${
                      emailStatus.includes("✅")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                    {emailStatus}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Select an inquiry
                  </h3>
                  <p className="text-gray-500">
                    Choose a customer inquiry from the list to view details and
                    respond
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
