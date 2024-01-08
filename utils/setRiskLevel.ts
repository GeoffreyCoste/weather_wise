export const setRiskLevel = (uv: number | undefined) => {
    if (!uv) { return '' } 
    else if (uv > 0 && uv <= 2) { return 'low' }
    else if (uv > 2 && uv <= 5) { return "moderate" }
    else if (uv > 5 && uv <= 7) { return "high" }
    else if (uv > 7 && uv <= 10) { return "very_high" }
    else if (uv > 10 && uv <= 16) { return "extreme" }
}