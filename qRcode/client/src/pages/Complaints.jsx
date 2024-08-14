import React, { useState } from "react";

const Complaint = () => {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");

  const complaints = [
    {
      complaint: "Unable to login to the dashboard",
      severity: "High",
      suggestion: "Fix the login API",
      business: "Business A",
      timeSubmitted: "2024-08-12 12:30 PM",
      status: "New",
    },
    {
      complaint: "Billing page is too slow",
      severity: "Medium",
      suggestion: "Optimize the billing page",
      business: "Business B",
      timeSubmitted: "2024-08-11 03:45 PM",
      status: "Read",
    },
    // Add more complaint objects as needed
  ];

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (selectedBusiness ? complaint.business === selectedBusiness : true) &&
      (selectedStatus ? complaint.status === selectedStatus : true) &&
      (selectedSeverity ? complaint.severity === selectedSeverity : true)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 lg:ml-20">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Barqon CRM Complaint Page
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label
            htmlFor="business"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Business
          </label>
          <select
            id="business"
            name="business"
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Businesses</option>
            <option value="Business A">Business A</option>
            <option value="Business B">Business B</option>
            {/* Add more business options as needed */}
          </select>
        </div>

        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label
            htmlFor="status"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Status
          </label>
          <select
            id="status"
            name="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Read">Read</option>
            <option value="Resolved">Resolved</option>
            <option value="Ignore">Ignore</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label
            htmlFor="severity"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 text-left">Complaint</th>
              <th className="py-3 px-4 text-left">Severity</th>
              <th className="py-3 px-4 text-left">Suggestions</th>
              <th className="py-3 px-4 text-left">Business</th>
              <th className="py-3 px-4 text-left">Time Submitted</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4">{complaint.complaint}</td>
                <td className={`py-3 px-4 text-${complaint.severity === "High" ? "red-600" : complaint.severity === "Medium" ? "yellow-600" : "green-600"}`}>
                  {complaint.severity}
                </td>
                <td className="py-3 px-4">{complaint.suggestion}</td>
                <td className="py-3 px-4">{complaint.business}</td>
                <td className="py-3 px-4">{complaint.timeSubmitted}</td>
                <td className="py-3 px-4">{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
