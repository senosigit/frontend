import fastdom from 'lib/fastdom-promise';
import template from 'lodash/utilities/template';
import campaignTemplate from 'raw-loader!journalism/views/campaigns.html';
import { init as initCampaign } from './campaigns';

export const renderCampaign = () => {
    const endOfArticle = document.querySelector(
        '.content__article-body .submeta'
    );
    makeCampaign(endOfArticle);
};

const makeCampaign = anchorNode => {
    console.log('in rendereer', initCampaign());

    const campaign = template(campaignTemplate, { data: initCampaign() });
    const campaignDiv = `<figure class="element element-campaign">${
        campaign
    }</figure>`;

    fastdom.write(() => {
        anchorNode.insertAdjacentHTML('beforebegin', campaignDiv);
    });
};
