// @flow
import fastdom from 'lib/fastdom-promise';
import template from 'lodash/utilities/template';
import campaignTemplate from 'raw-loader!journalism/views/campaignTemplate.html';
import { init as initCampaign } from './campaigns';

const makeCampaign = (anchorNode: HTMLElement): void => {
    const campaign = template(campaignTemplate, { data: initCampaign() });
    const campaignDiv = `<figure class="element element-campaign">${
        campaign
    }</figure>`;

    fastdom.write(() => {
        anchorNode.insertAdjacentHTML('afterend', campaignDiv);
    });
};

export const renderCampaign = () => {
    const fourthParagraph = document.querySelectorAll(
        '.content__article-body p'
    )[4];

    if (fourthParagraph) makeCampaign(fourthParagraph);
};
