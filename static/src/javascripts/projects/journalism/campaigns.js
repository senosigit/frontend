import config from 'lib/config';
import fastdom from 'lib/fastdom-promise';

export function init (){
  const allCampaigns = config.get("page.campaigns");
  
  const campaignToShow = allCampaigns.filter(isTip).pop();
  const campaignFields = allCampaigns["fields"];
  
  const articleBody = document.querySelector(".content__article-body");
  
  // console.log("=====>", campaignToShow["fields"]["callout"]);
  
  const campaignElement = document.createElement("div");
  const titleEl = document.createTextNode(campaignFields["callout"]);
  const descripEl = document.createTextNode(campaignFields["description"]);
  
  const theBox = campaignElement.append(titleEl, descripEl);  
  
  // console.log("description", theBox);
  
  function isTip(campaign){
    return campaign.fields._type === "tip"
  }
  
  return fastdom.write(() => { 
    return articleBody.appendChild(<p>SOME ELEMENT</p>);
    
  });
  
  /*
  1- query the dom for article body
  2- build a dom tree
  3- append dom tree to b body*/
}; 