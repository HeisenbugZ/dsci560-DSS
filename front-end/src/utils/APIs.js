// backend
export const base = "http://127.0.0.1:5000/";

export function API_IndustryInfo ( naics ) {
    return base + 'description?code=' + naics
};

// need to update
export function API_Recommendations ( district ) {
  return base + 'recommandation?district=' + district
};

export function API_Active_Business ( district, start, end, num=null, IndustryCode=null ) {
  return base + 'active_data?district=' + district
              + (start ? `&start=${start}` : "")
              + (end ? `&start=${end}` : "")
              + (num ? `&num=${num}` : "")
              + (IndustryCode ? `&code=${IndustryCode}` : "");
}

export function API_Change_Ratio (district, start=null, end=null, num=null, IndustryCode=null ) {
  return base + "change_ratio?district=" + district 
              + (start ? `&start=${start}` : "")
              + (end ? `&start=${end}` : "")
              + (num ? `&num=${num}` : "")
              + (IndustryCode ? `&code=${IndustryCode}` : "");
}

export function API_Prediction() {
  return base + 'active_pred'
}

export function API_Capacity (district, naics) {
  return base + "capacity?district=" + district 
              + (naics ? `&code=${naics}` : "");
}

export function API_DistrictInfo (district) {
  return base + "district_info?district=" + district
}

export function API_Eco (naics=null, num=10, start=null, end=null) {
  return base + "eco_data?"
              + (naics ? `&code=${naics}` : "")
              + (num ? `&num=${num}` : "")
              + (start ? `&start=${start}` : "")
              + (end ? `&start=${end}` : "")
              
}

// openAPI
export const OPENAI_API_KEY = "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"