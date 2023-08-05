const CampaignDetailsPopup = ({ campaign, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
          <p className="text-gray-600 mb-4">{campaign.details}</p>
          <p className="text-gray-600">Objective: {campaign.chanel_asset}</p>
          <p className="text-gray-600">Category: {campaign.chanel}</p>
          <p className="text-gray-600">Live Date: {campaign.depends}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default CampaignDetailsPopup;