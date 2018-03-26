import fastdom from 'lib/fastdom-promise';
import template from 'lodash/utilities/template';
import campaignTemplate from 'raw-loader!journalism/views/campaigns.html';
import { init as initCampaign } from './campaigns';


export const renderCampaign = () => {
    const article = document.querySelector('.content__article-body');
    // const endOfArticle = document.querySelector('.content__article-body .submeta');
    makeCampaign(article);
};

const makeCampaign = (campaignSlotNode) => {

    console.log("this ran - make Campaign");

    console.log("in rendereer", initCampaign());

    const campaign = template(campaignTemplate, {
        data: initCampaign(),
    });

    const campaignDiv = `<figure class="element element-campaign">${campaign}</figure>`;

    console.log("campaign div", campaignDiv);

    return fastdom.write(() => {
        campaignSlotNode.insertAdjacentHTML('beforeend', campaignDiv);
    });

    return Promise.resolve(null);
};
