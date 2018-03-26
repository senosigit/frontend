// @flow
import config from 'lib/config';

export function init() {
    console.log('something happened');

    function isCallout(campaign) {
        return campaign.fields._type === 'callout';
    }
    // extract data
    const allCampaigns = config.get('page.campaigns');
    const campaignToShow = allCampaigns.filter(isCallout).pop();
    const campaignFields = campaignToShow.fields;
    const formFields = campaignFields.formFields;

    const returnObj = {
        title: campaignFields.callout,
        description: campaignFields.description,
        formFields
    };

    return returnObj;

}

    // // create container, title & description
    // const campaignElement = document.createElement('details');
    // const summaryElement = document.createElement('summary');
    // const titleEl = document.createElement('p');
    // const descripEl = document.createElement('p');
    // titleEl.textContent = campaignFields.callout;
    // descripEl.textContent = campaignFields.description;
    //
    // // create form
    // const formEl = document.createElement('form');
    // formEl.setAttribute('method', 'post');
    // formEl.setAttribute('action', formstackPostPath);
    // const submitButton = document.createElement('input');
    // submitButton.setAttribute('type', 'submit');
    // submitButton.setAttribute('value', 'Share with the Guardian!!!!');
    //
    // // create form fields
    // const formFieldEls = formFields.map(field => {
    //     const fieldset = document.createElement('fieldset');
    //     const label = document.createElement('label');
    //     const labelSpan = document.createElement('span');
    //     const input = document.createElement('input');
    //
    //     label.textContent = field.label;
    //     labelSpan.textContent = field.description;
    //     label.setAttribute('for', field.name);
    //     label.appendChild(labelSpan);
    //
    //     input.setAttribute('type', field.type);
    //     input.setAttribute('name', field.name);
    //     if (field.required === '1') {
    //         input.setAttribute('required', 'true');
    //     }
    //
    //     fieldset.appendChild(label);
    //     fieldset.appendChild(input);
    //     return fieldset;
    // });
    //
    // // append form elements to form
    // formFieldEls.forEach(el => {
    //     formEl.appendChild(el);
    // });
    // formEl.appendChild(submitButton);
    //
    // // append everything to container
    // summaryElement.appendChild(titleEl);
    // summaryElement.appendChild(descripEl);
    // campaignElement.appendChild(summaryElement);
    // campaignElement.appendChild(formEl);


