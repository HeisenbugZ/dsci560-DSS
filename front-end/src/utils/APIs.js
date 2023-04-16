// backend
export const base = "http://127.0.0.1:5000/";

export function API_IndustryInfo ( naics ) {
    return base + 'description?code=' + naics
};

// need to update
export function API_Recommendations ( district ) {
  return base + 'recommandation?district=' + district
};

export function API_Active_Business ( district, star, end ) {
  return base + 'active_data?district=' + district
}

export function API_Change_Ratio (district, start=null, end=null ) {
  return base + "change_ratio?district=" + district 
          + (start ? `&start=${start}` : "")
          + (end ? `&start=${end}` : "");
}

export function API_Prediction() {
  return base + 'active_pred'
}

// openAPI
export const OPENAI_API_KEY = "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"