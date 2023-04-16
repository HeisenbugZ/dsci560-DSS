// backend
export const base = "http://127.0.0.1:5000/";

export function API_IndustryInfo ( naics ) {
    return base + 'description?code=' + naics
};

// need to update
export function API_Recommendations ( district ) {
  return base + 'recommandation?district=' + district
};

export function API_Active_Business ( district, start, end, num=null ) {
  return base + 'active_data?district=' + district
              + (start ? `&start=${start}` : "")
              + (end ? `&start=${end}` : "")
              + (num ? `&num=${num}` : "");
}

export function API_Change_Ratio (district, start=null, end=null, num=null ) {
  return base + "change_ratio?district=" + district 
              + (start ? `&start=${start}` : "")
              + (end ? `&start=${end}` : "")
              + (num ? `&num=${num}` : "");
}

export function API_Prediction() {
  return base + 'active_pred'
}

// openAPI
export const OPENAI_API_KEY = "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"