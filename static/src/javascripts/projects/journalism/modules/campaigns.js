// @flow
import config from 'lib/config';

export function init() {
    function isCallout(campaign) {
        return campaign.fields._type === 'callout';
    }
    const allCampaigns = config.get('page.campaigns');
    const campaignToShow = allCampaigns.filter(isCallout).pop();

    const returnObj = {
        title: campaignToShow.fields.callout,
        description: campaignToShow.fields.description,
        formFields: campaignToShow.fields.formFields,
    };

    return returnObj;
}
