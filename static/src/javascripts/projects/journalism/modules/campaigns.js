// @flow
import config from 'lib/config';

export const init = () => {
    // eslint-disable-next-line
    const isCallout = campaign => campaign.fields._type === 'callout';
    const allCampaigns = config.get('page.campaigns');

    const campaignToShow = allCampaigns.filter(isCallout).pop();

    console.log(campaignToShow.fields.formFields);

    return {
        title: campaignToShow.fields.callout,
        description: campaignToShow.fields.description,
        formFields: campaignToShow.fields.formFields,
    };
};
