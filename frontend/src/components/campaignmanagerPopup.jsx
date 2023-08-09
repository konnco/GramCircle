import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase-creator.js';
import { supabaseBrand } from '../../supabase.js';



const CampaignDetailsPopup = ({ campaign, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [showSubmitLinkPopup, setShowSubmitLinkPopup] = useState(false);
  const [redemptionLink, setRedemptionLink] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);


  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('activeCampaigns')
        .select('*')
        .eq('campaign_id', campaign.id);

      if (data) {
        setSubmissions(data);
      } else {
        console.error('Error fetching submissions:', error);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleShowSubmitLinkPopup = (submissionId) => {
    setSelectedCampaign(submissionId);
    setShowSubmitLinkPopup(true);
  };

  const handleApprove = async (submissionId) => {
    try {
      const { error } = await supabase
        .from('activeCampaigns')
        .update({ approved: true })
        .eq('id', submissionId);
    

      if (error) {
        console.error('Error updating submission:', error);
      } else {
        // Refresh submissions after approval
        setSelectedCampaign(submissionId)
        setShowSubmitLinkPopup(true)
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  const handleSubmitRedemptionLink = async (selectedCampaign) => {
    if (!redemptionLink) {
      // Handle validation if required
      return;
    }

    try {
      const { error } = await supabase
        .from('activeCampaigns')
        .update({ redemption_link: redemptionLink })
        .eq('id',selectedCampaign);

      if (error) {
        console.error('Error updating redemption link:', error);
      } else {
        // Close the submit link popup and refresh submissions
        setShowSubmitLinkPopup(false);
        setRedemptionLink('');
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error updating redemption link:', error);
    }
  };

  const handleDeleteCampaign = async () => {
    try {
      const { error } = await supabaseBrand
        .from('campaigns')
        .delete()
        .eq('id', campaign.id);

      if (error) {
        console.error('Error deleting campaign:', error);
      } else {
        setShowDeletePopup(true);
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };


    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">{campaign.campaignName}</h3>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <p className="text-gray-600">Objective: {campaign.chanel}</p>
          <p className="text-gray-600">Platform: {campaign.chanel}</p>
          <p className="text-gray-600">Type: {campaign.chanel_asset}</p>
          <p className="text-gray-600">Redemption Type: {campaign.exchange}</p>
          <p className="text-gray-600">Quantity: {campaign.details}</p>
          <p className="text-gray-600">Performance: {campaign.depends}</p>
        <button className="mt-4 bg-[#10163F] hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={onClose}>Close</button>
         {/* ... (rest of the component content) */}
         <button
          className="mt-4 mb-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
          onClick={handleDeleteCampaign}
        >
          Delete Campaign
        </button>
        {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Campaign Deleted Successfully</h3>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => {
                setShowDeletePopup(false);
                onClose();
                window.location.reload(); // Refresh the page
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
        {submissions.length > 0 && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Submissions</h3>
          <table className="mt-2 w-full">
            <thead>
              <tr className="border-b-2 border-[#B5B5B5]">
                <th className="w-1/2 py-2 text-lg">User Name</th>
                <th className="w-1/2 py-2 text-lg">Submit Link</th>
                <th className="w-1/4 py-2 text-lg">Redemption Link</th> {/* New column */}
                <th className="w-1/4 py-2 text-lg">Approve</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b-2 border-[#B5B5B5]">
                  <td className="w-1/2 py-2 text-lg">{submission.userName}</td>
                  <td className="w-1/2 py-2 text-lg">
                    <a href={submission.submitLink} target="_blank" rel="noopener noreferrer">
                      {submission.submitLink}
                    </a>
                  </td>
                  <td className="w-1/4 py-2 text-lg">
                    {submission.redemption_link ? (
                      <button
                        className="bg-[#10163F] hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={() => handleShowSubmitLinkPopup(submission.id)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="bg-[#10163F] hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={() => handleShowSubmitLinkPopup(submission.id)}
                      >
                        Submit Redemption Link
                      </button>
                    )}
                  </td>
                  <td className="w-1/4 py-3">
                    {submission.approved ? (
                      <span className="text-green-500 font-semibold">Approved</span>
                    ) : (
                      <button
                        className="bg-[#10163F] hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={() => handleApprove(submission.id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSubmitLinkPopup && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Submit Redemption Link</h3>
          <input
            type="text"
            value={redemptionLink}
            onChange={(e) => setRedemptionLink(e.target.value)}
            placeholder="Enter Redemption Link"
            className="border p-2 w-full rounded"
          />
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => handleSubmitRedemptionLink(selectedCampaign)}
          >
            Submit
          </button>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setShowSubmitLinkPopup(false)}
          >
            Cancel
          </button>
        </div>
      )}
      </div>
    );
  };
  
  export default CampaignDetailsPopup;